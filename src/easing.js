"use strict";
/*
TERMS OF USE - EASING EQUATIONS
---------------------------------------------------------------------------------
Open source under the BSD License.

Copyright © 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer. Redistributions in binary
form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials provided
with the distribution. Neither the name of the author nor the names of
contributors may be used to endorse or promote products derived from this
software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
---------------------------------------------------------------------------------
*/

var PI_M2 = Math.PI*2;
var PI_D2 = Math.PI/2;

/*
Linear
---------------------------------------------------------------------------------
*/
module.exports.easeLinear = function( t, b, c, d ){
	return c*t/d + b;
};

/*
Sine
---------------------------------------------------------------------------------
*/
module.exports.easeInSine = function( t, b, c, d ){
	return -c * Math.cos(t/d * PI_D2) + c + b;
};
module.exports.easeOutSine = function( t, b, c, d ){
	return c * Math.sin(t/d * PI_D2) + b;
};
module.exports.easeInOutSine = function( t, b, c, d ){
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};

/*
Quintic
---------------------------------------------------------------------------------
*/
module.exports.easeInQuint = function( t, b, c, d ){
	return c*(t/=d)*t*t*t*t + b;
};
module.exports.easeOutQuint = function( t, b, c, d ){
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
};
module.exports.easeInOutQuint = function( t, b, c, d ){
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
};

/*
Quartic
---------------------------------------------------------------------------------
*/
module.exports.easeInQuart = function( t, b, c, d ){
	return c*(t/=d)*t*t*t + b;
};
module.exports.easeOutQuart = function( t, b, c, d ){
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};
module.exports.easeInOutQuart = function( t, b, c, d ){
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
};

/*
Quadratic
---------------------------------------------------------------------------------
*/
module.exports.easeInQuad = function( t, b, c, d ){
	return c*(t/=d)*t + b;
};
module.exports.easeOutQuad = function( t, b, c, d ){
	return -c *(t/=d)*(t-2) + b;
};
module.exports.easeInOutQuad = function( t, b, c, d ){
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
};

/*
Exponential
---------------------------------------------------------------------------------
*/
module.exports.easeInExpo = function( t, b, c, d ){
	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};
module.exports.easeOutExpo = function( t, b, c, d ){
	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};
module.exports.easeInOutExpo = function( t, b, c, d ){
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

/*
Elastic
---------------------------------------------------------------------------------
*/
module.exports.easeInElastic = function( t, b, c, d ){
	var a = undefined;
	var p = undefined;
	var s;
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (!a || a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/PI_M2 * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )) + b;
};
module.exports.easeOutElastic = function( t, b, c, d ){
	var a = undefined;
	var p = undefined;
	var s;
	if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
	if (!a || a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/PI_M2 * Math.asin (c/a);
	return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*PI_M2/p ) + c + b);
};
module.exports.easeInOutElastic = function( t, b, c, d ){
	var a = undefined;
	var p = undefined;
	var s;
	if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
	if (!a || a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/PI_M2 * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*PI_M2/p )*.5 + c + b;
};

/*
Circular
---------------------------------------------------------------------------------
*/
module.exports.easeInCircular = function( t, b, c, d ){
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};
module.exports.easeOutCircular = function( t, b, c, d ){
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};
module.exports.easeInOutCircular = function( t, b, c, d ){
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};

/*
Back
---------------------------------------------------------------------------------
*/
module.exports.easeInBack = function( t, b, c, d ){
	var s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
};
module.exports.easeOutBack = function( t, b, c, d ){
	var s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};
module.exports.easeInOutBack = function( t, b, c, d ){
	var s = 1.70158;
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};

/*
Bounce
---------------------------------------------------------------------------------
*/
function easeOutBounce( t, b, c, d ){
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}
module.exports.easeOutBounce = function( t, b, c, d ){
	return easeOutBounce( t, b, c, d );
};
function easeInBounce( t, b, c, d ){
	return c - easeOutBounce(d-t, 0, c, d) + b;
}
module.exports.easeInBounce= function( t, b, c, d ){
	return c - easeOutBounce(d-t, 0, c, d) + b;
};
module.exports.easeInOutBounce = function( t, b, c, d ){
	if (t < d/2) return easeInBounce(t*2, 0, c, d) * .5 + b;
	else return easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
};

/*
Cubic
---------------------------------------------------------------------------------
*/
module.exports.easeInCubic = function( t, b, c, d ){
	return c*(t/=d)*t*t + b;
};
module.exports.easeOutCubic = function( t, b, c, d ){
	return c*((t=t/d-1)*t*t + 1) + b;
};
module.exports.easeInOutCubic = function( t, b, c, d ){
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
};
