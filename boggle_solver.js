/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
function findAllSolutions(grid, dictionary) {
  var solutions = [];
  converttolowercase(grid,dictionary);
  var trie = MakeTrie(dictionary);
  //console.log(isword('gent',trie));
  //console.log(isprefix('ge',trie));
  
  //test every function to see if it works
  
  //1. Check inputs parameters(returns [] if correct)
  //1a. Check if any empty input 
  if (grid== null || dictionary == null){
  return solutions;
  }
  
  //1b. CHECK IF MXM
  var M =grid.length;
  
  if(M==0){
    return solutions;
    console.log(M);
    
  }
  
  for(var i =0; i<M; i++){
    if(grid[i].length!= M){
      return solutions;
    }
  }

// Convert inputs data into same case
  //Setup any Data structures(Visited, solutions, dictionary(Trie|Hash|List|Set))
  
  //let trie = new Set(dictionary);
  
  
  var solutionset = new Set();
  //iterate over NxN grid - finda all words that begin with grid [y][x]
  for(let y=0; y<M; y++){
    for(let x= 0; x<M; x++){
      let word= "";
      let visited = new Array(M).fill(false).map(()=> new Array(M).fill(false));
      findwords(word,y,x,grid,visited,trie,solutionset);
      //make sure all variables are in order in function call
    }
  }
  solutions = Array.from(solutionset)
  return solutions
}


///////////////////////////////////////////////////

var TrieNode = function(value){
  this.value = value;
  this.children = new Array();
  this.isword = false;

};
//////////////////////////////////////////////////

var MakeTrie = function(dict){
  var root = new TrieNode('');
  
  if(dict.length == 0){
    return;
  }
  for(var words of dict){
    var node = root;
    // for each letter in the word
    for(var i= 0;i<words.length;i++){
      var letter = words[i];
      var ord = letter.charCodeAt(0)-97;
      // if a node with that letter doesnt exist:
      var curNode = node.children[ord];
      if(node.children[ord]== undefined){
        //create one
        var curNode = new TrieNode(letter);
        node.children[ord]= curNode;
        
      }
      node=curNode;
    }
    node.isword = true
  }
  return root;
};

/////////////////////////////

function isword(word,trie){
  
  let subword = ''
  let curNode = trie
  for(let i = 0;i< word.length;i++){
    if(curNode != undefined){
      for(let node of curNode.children){
        if(node!= undefined && node.value == word[i]){
          subword += word[i]
          curNode = node;
          break;
        }
      }
    }
  }
  if(word == subword && curNode.isword == true){
    return true;
  }
  return false
}
function findwords(word,y,x,grid,visited,trie,solutionset){
  //let triee = MakeTrie(dictionary);
  
  let adjacentMatrix =[[-1, -1],
                   [-1, 0],
                   [-1, 1],
                   [0, 1],
                   [1, 1],
                   [1, 0],
                   [1,-1],
                   [0, -1]];
  
  
  if(y< 0||x<0||y>=grid.length||x>=grid.length||visited[x][y]== true){
    return;
  }
  
  word += grid[x][y];
  
  //console.log("Cur word = "+word+"
  //Grid[])
  //console.log(word);
  if(isprefix(word,trie)){
    visited[x][y]= true;
   //1.a check if that prefix is an axtual word in the dictionary
    
    if(isword(word,trie)){
      //console.log(word);
      if(word.length>2){
        //console.log(word)
        solutionset.add(word);
      }
    }
    for (let i = 0; i<8; i++){
      findwords(word,y+adjacentMatrix[i][0],x+adjacentMatrix[i][1],grid,visited,trie,solutionset)
      
    }
  }
  visited[x][y] = false;
  
}
//////////////////////////////////
function isprefix(word,trie){
  /*//console.log(trie);
  */
  
  let subword = ''
  
  let curNode = trie;
  
  for(let i = 0;i<word.length; i++){
   
    if(curNode != undefined){
      
      for(let node of curNode.children){
        
        if(node!=undefined){
          if(node!= undefined && node.value == word[i]){
            subword+= word[i];
            curNode = node;
            break;
            }
        }
      }
    }
  }
      if(word == subword){
        return true;
      }
      return false;
   }



    ////////////////////
function converttolowercase(grid,dict){
  for(let i =0; i<grid.length;i++){
    for(let j =0; j<grid.length;j++){
      if(grid[i][j]){
        grid[i][j]= grid[i][j].toLowerCase();
          }
      
        }
    
      }
      for(let j = 0; j <dict.length;j++){
        dict[j]=dict[j].toLowerCase();
      }
      
      
      
    }
   /////////////////////
var grid = [  ['t', 'w', 'y', 'r'],
              ['e', 'n', 'p', 'h'],
              ['g', 'z', 'qu','r'],
              ['o', 'n', 't', 'a']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];


//console.log(exports.findAllSolutions(grid, dictionary));
export default findAllSolutions;

  

