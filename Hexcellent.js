/**
 * Copyright 2011 Matthew Delaney
 * 
 * This file is part of Hexcellent.
 *
 * Hexcellent is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Hexcellent is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Hexcellent.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Filename: Hexcellent.js
 * Purpose : A drawable hexagonal grid with point location (e.g. which cell is the point (u, v) in?)
 * Date    : 31/7/2011
 * @author Matthew Delaney
 */
function Hexcellent(aCellSize, aWidth, aHeight, aLeft, aTop) {
	var grid = new Array();
	var cellSize = aCellSize
	var gridWidth = aWidth;
	var gridHeight = aHeight;
	var left = aLeft;
	var top = aTop;

	var h = new Hexagon(cellSize, 0, 0);
	var horizOffset = h.getH()*2+h.getA()*2;
	var verticOffset = h.getO();
	var evenLineOffset = h.getH()+h.getA();

	for(var i = 0; i < gridHeight; i++) {
		grid[i] = new Array();
		for(var j = 0; j < gridWidth; j++) {
			if (i%2 == 0) {
				grid[i][j] = new Hexagon(cellSize, (j*horizOffset+evenLineOffset)+left, ((i+1)*verticOffset)+top);
			} else {
				grid[i][j] = new Hexagon(cellSize, (j*horizOffset)+left, ((i+1)*verticOffset)+top);
			}
		}
	}
	
	this.draw = function(context) {
		for(var i = 0; i < gridHeight; i++) {
			for(var j = 0; j < gridWidth; j++) {
				grid[i][j].draw(context);
			}
		}
	}
	
	// Find the cell containing point (u, v)
	this.findCell = function(u, v) {
		var retval = null;
		
		for(var i = 0; i < gridHeight; i++) {
			for(var j = 0; j < gridWidth; j++) {
				if (grid[i][j].contains(u, v))  {
					retval = grid[i][j];
					
					// Add grid coordinates of cell to returned object
					retval.gridX = j;
					retval.gridY = i;
				}
			}
		}
		
		return retval;
	}
}
