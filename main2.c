
#include  <stdio.h>
#include  <sys/types.h>
#include <stdlib.h>


#define   MAX_COUNT  200

void  ChildProcess(int);                /* child process prototype  */
void  ParentProcess(void);   
long int random(void);

void  main(void){
  pid_t  pid;
  int num;
  
  // for loop to create more than one child processes
   for (num = 0; num < 2; num++){
     //function to create processes
     pid = fork();
     if (pid == 0)
          ChildProcess(num);
     else if (pid < 0)
         printf("error in the fork\n");
  }
  ParentProcess();
  
}

void  ChildProcess(int myid){
  int i;
  int random_n;
  int random_m;
  
  random_m = rand()%2 +1;
  for(i = 0; i < random_m; i++ ){
    printf("Child Pid: %d is going to sleep now!\n",getpid());
  
    srand(getpid());
  
    random_n = rand()%10;

    sleep(random_n +1);
      printf("Child Pid: is awake now!\n Where is my parent: %d\n",getppid());
    
  }
   exit(0);

  
}

void  ParentProcess(void){
 int num;
 int pid;
 int status;
 for(num = 0; num <2; num++){
   pid = wait(&status);
   printf("Childp Pid: %d has completed\n",pid);
 }
     
}