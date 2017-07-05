function AI(grid) {this.grid = grid}

AI.prototype.isTerminal = function(depth, grid, maxplayer) {
  if(depth == 0) return true  
  if(!maxplayer  && grid.getAvailableCells() == 0) return false
  if(maxplayer && grid.getAvailableMoves().length == 0) return false
  return true
};

AI.prototype.evalFunc =  function(grid) {
    var vr = 0
    var mergenum = 0
    var monodiffnum = 0

    for( i in [0, 1, 2, 3]) {
      for( j in [0, 1, 2, 3]) {
        i = parseInt(i)
        j = parseInt(j)
      if(i > 0) {
        temp = Math.abs(grid.getCellValue(i,j) - grid.getCellValue(i-1, j))
        if(temp == 0) mergenum+=1
        if(grid.getCellValue(i,j) - grid.getCellValue(i-1, j) > 0) monodiffnum+=1
      }
      if(i < 3) {
        temp = Math.abs(grid.getCellValue(i,j) - grid.getCellValue(i+1, j))
        if(temp == 0) mergenum+=1
        if(grid.getCellValue(i+1,j) - grid.getCellValue(i, j) > 0) monodiffnum+=1
      }        
      if(j > 0) {
        temp = Math.abs(grid.getCellValue(i,j) - grid.getCellValue(i, j-1))
        if(temp == 0) mergenum+=1
        if(grid.getCellValue(i,j) - grid.getCellValue(i, j-1) > 0) monodiffnum+=1
      }
      if(j < 3) {
        temp = Math.abs(grid.getCellValue(i,j) - grid.getCellValue(i, j+1))
        if(temp == 0) mergenum+=1 
        if(grid.getCellValue(i,j+1) - grid.getCellValue(i, j) > 0) monodiffnum+=1
      }  
    }
  }
  console.log(grid.maxValue())
  return 3*mergenum+monodiffnum+3*grid.availableCells().length+grid.maxValue()
};


AI.prototype.minimize = function(depth, grid, alpha, beta, maxplayer) {
  if(this.isTerminal(depth, grid, maxplayer)) return this.evalFunc(grid)
    var minUtility = Infinity
    for(var cell in grid.availableCells()) {
      var gchild = grid.clone()
      var number = randint(0,9)             
      if(number < 9) {
        var newtile = new Tile(cell.x, cell.y, 2)
        gchild.insertTile(newtile)
      }  
      if(number == 9) {
        var newtile = new Tile(cell.x, cell.y, 4)
        gchild.insertTile(newtile)
      }    
      var utility = this.maximize(depth-1, gchild, alpha, beta, false)
      if(utility < minUtility) {
        minUtility =  utility
      }
      if(minUtility <= alpha) break
      if(minUtility < beta) beta = minUtility
  }
  return minUtility
};

AI.prototype.maximize  = function(depth, grid, alpha, beta, maxplayer) {
  if(this.isTerminal(depth, grid, maxplayer)) return this.evalFunc(grid)  
  var maxUtility = -Infinity
  for(var action in [0, 1, 2, 3]) {
      action  = parseInt(aciton)
      var gchild = grid.clone()
      if(gchild.move(action).moved) {
        gchild.move(action)
        var utility = this.minimize(depth-1, gchild, alpha, beta, true)
        if(utility > maxUtility) maxUtility = utility
        if(maxUtility >= beta) break
        if(maxUtility > alpha) alpha = maxUtility
      }
  }
  return maxUtility
};

AI.prototype.decision = function() {
  var maxutility = -Infinity
  var resultmove = null
  var grid = this.grid
  for(var move in [0, 1, 2, 3]) {
      var move = parseInt(move)
      gmovegrid = grid.clone()
      if(gmovegrid.move(move).moved) {
        moveutility = this.maximize(4, gmovegrid, -Infinity, Infinity, true)
        if(moveutility  > maxutility) {
          maxutility = moveutility
          resultmove = move
      }
    }
  }
  return resultmove
};

AI.prototype.aiPlaying = function() {
    return this.decision()
};


