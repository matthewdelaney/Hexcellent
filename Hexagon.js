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
 * Filename: Hexagon.js
 * Purpose : A drawable hexagon class with point-membership (i.e. is point (u, v) in this hexagon?)
 * Date    : 31/7/2011
 * @author Matthew Delaney
 */
function Hexagon(aSize, anX, aY) {
	// Throw exception on any invalid parameter
	if (aSize < 0) {
		throw new RangeError("Size cannot be negative!");
	} else if (anX < 0) {
		throw new RangeError("X-coordinate cannot be negative!");
	} else if (aY < 0) {
		throw new RangeError("Y-coordinate cannot be negative!");
	}
	
	// The instance variables a, h and o correspond respectively to the adjacent side, hypotenuse and opposite side
	// of the right-angled triangle at the top-left of the hexagon
	var TANSIXTY = Math.tan(2*Math.PI/360*60); // Precalculate this for efficiency's sake
	var size = aSize; // Size is the width of the hexagon
	var x = anX;
	var y = aY;
	var a;
	var h;
	var o;
	
	a = size/4;
	h = size/4*2;
	o = TANSIXTY*a;
	
	this.getSize = function() {
		return size;
	}
	
	this.setSize = function(aSize) {
		size = aSize;
	}
	
	this.getA = function() {
		return a;
	}
	
	this.setA = function(anA) {
		a = anA;
	}
	
	this.getH = function() {
		return h;
	}
	
	this.setH = function(anH) {
		h = anH;
	}
	
	this.getO = function() {
		return o;
	}
	
	this.setO = function(anO) {
		o = anO;
	}
	
	this.getX = function() {
		return x;
	}
	
	this.setX = function(anX) {
		x = anX;
	}
	
	this.getY = function() {
		return y;
	}
	
	this.setY = function(aY) {
		y = aY;
	}
	
	// Given a 2D drawing context on an HTML5 <canvas> tag, draw this Hexagon
	this.draw = function(context) {
				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(x+a, y-o);
				context.lineTo(x+a+h, y-o);
				context.lineTo(x+a+a+h, y);
				context.lineTo(x+a+h, y+o);
				context.lineTo(x+a, y+o);
				context.lineTo(x, y);
				context.fill();
				context.stroke();
				context.closePath();
	}
	
	// Is the point (u, v) contained within this Hexagon?
	this.contains = function(u, v) {
		var retval = false;

		// Box in centre of hexagon
		var inBox = u >= (x+a) && u <= (x+a+h) && v >= (y-o) && v <= (y+o);
		
		// Triangle to the left of box
		var inLeftTriangle = u >= x && u <= x + a && v >= y - (u - x) * TANSIXTY && v <= y + (u - x) * TANSIXTY;
		
		// Triangle to the right of box
		var inRightTriangle = u >= x + a + h && u <= x + a + h + a && v >= y - (x + a + h + a - u) * TANSIXTY && v <= y + (x + a + h + a - u) * TANSIXTY;
		
		if (inLeftTriangle || inBox || inRightTriangle) {
			retval = true;
		}
		
		return retval;
	}
}
