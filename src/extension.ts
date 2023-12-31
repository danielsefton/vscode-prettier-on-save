import * as vscode from "vscode";
import * as cp from "child_process";

let disposable: vscode.Disposable | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log("Prettier on Save is active.");

  disposable = vscode.workspace.onDidSaveTextDocument((document) => {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (workspaceFolder) {
      let command: string;
      let args: string[];

      // Determine the command and arguments based on the platform
      if (process.platform === "win32") {
        // On Windows, use cmd.exe to run prettier
        command = "cmd";
        args = ["/c", "prettier", "--write", document.uri.fsPath];
      } else {
        // On macOS and Linux, directly use prettier
        command = "prettier";
        args = ["--write", document.uri.fsPath];
      }

      cp.execFile(
        command,
        args,
        { cwd: workspaceFolder.uri.fsPath },
        (error, stdout, stderr) => {
          if (error) {
            console.warn(
              `Warning: Error running 'prettier' command, is it installed? ${error.message}`,
            );

            // If prettier command fails, fall back to npx
            if (process.platform === "win32") {
              // On Windows, use cmd.exe to run npx prettier@latest
              command = "cmd";
              args = [
                "/c",
                "npx",
                "prettier@latest",
                "--write",
                document.uri.fsPath,
              ];
            } else {
              // On macOS and Linux, directly use npx
              command = "npx";
              args = ["prettier@latest", "--write", document.uri.fsPath];
            }

            cp.execFile(
              command,
              args,
              { cwd: workspaceFolder.uri.fsPath },
              (error, stdout, stderr) => {
                if (error) {
                  vscode.window.showErrorMessage(
                    `Error running both 'prettier' and 'npx prettier' commands. Do you have prettier and node.js installed? ${error.message}`,
                  );
                } else {
                  vscode.window.showInformationMessage(
                    "Prettier ran successfully via npx!",
                  );
                }
              },
            );
          } else {
            vscode.window.showInformationMessage("Prettier ran successfully!");
          }
        },
      );
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (disposable) {
    disposable.dispose();
  }
}
