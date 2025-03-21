#ifndef COMMANDS_H
#define COMMANDS_H

void execute_command(char *args[]);
void execute_internal_command(char **args);
void execute_external_command(char **args);

#endif
