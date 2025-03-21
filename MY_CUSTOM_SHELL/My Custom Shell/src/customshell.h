#ifndef CUSTOMSHELL_H
#define CUSTOMSHELL_H

void parse_and_execute(char *input);  // Function to parse input and execute commands
void execute_internal_command(char **args);  // Executes internal commands like 'cd', 'echo', etc.
void execute_external_command(char **args);
void handle_redirection(char **args);

#endif
