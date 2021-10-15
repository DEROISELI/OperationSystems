#include  <stdio.h>
#include  <string.h>
#include  <sys/types.h>

#define   MAX_COUNT  200
#define   BUF_SIZE   100
void  ChildProcess(int);                /* child process prototype  */
void  ParentProcess(void);   
long int random(void);

void  main(void)
{
     pid_t  pid;
     int    i;
     char   buf[BUF_SIZE];

     fork();
     pid = getpid();
     for (i = 1; i <= MAX_COUNT; i++) {
          printf(buf, "This line is from pid %d, value = %d\n", pid, i);
          write(1, buf, strlen(buf));
     } 
}

void  ChildProcess(int myid){
  
  int random;
 
  printf("Child Pid: %d is going to sleep now!\n",getpid());
  
  srand(getpid());
  
  random = rand()%10;
  
  sleep(random +1);
    printf("Child Pid: is awake now!\n Where is my parent: %d\n",getpid());
    //exit(0);
   
  //char var = 'C'
  //printf("This is my %c", var);
  //printf("Child Pid: %d is %s %f going to sleep!\n",getpid(),"hello",4.5F);
  
}
void  ParentProcess(void){
 int num;
 int pid;
 int status;
 for(num = 0; num <2; num++){
   pid = wait(&status);
   printf("Childp Pid: %d has completed",pid);
 }
     
}
