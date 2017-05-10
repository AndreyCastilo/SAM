/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"prioridad-pre": function ( span ) {
		return $(span).attr("data-pr");
	},

	"prioridad-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"prioridad-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );
