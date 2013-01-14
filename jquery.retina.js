/*
	Author: Troy Mcilvena (http://troymcilvena.com)
	Twitter: @mcilvena
	Date: 24 November 2011
	Version: 1.3
	
	Revision History:
		1.0 (23/08/2010)	- Initial release.
		1.1 (27/08/2010)	- Made plugin chainable
		1.2 (10/11/2010)	- Fixed broken retina_part setting. Wrapped in self executing function (closure)
		1.3 (29/10/2011)	- Checked if source has already been updated (via mattbilson)
*/


(function( $ ){
	$.fn.retina = function(settings) {
		settings = $.extend({
			retina_part: "@2x",
			save_size: true
		}, (typeof settings === "undefined") ? {} : settings)

		if(window.devicePixelRatio >= 2) {
			this.each(function(index, element) {
				if(!$(element).attr('src')) return;

				if(settings['save_size']) {
					var width = $(element).width();
					var height = $(element).height();
				}

				var new_image_src = $(element).attr('src');
				var pos = new_image_src.lastIndexOf('.');
				new_image_src = new_image_src.substring(0, pos) + settings['retina_part'] + new_image_src.substring(pos);

				$.ajax({
					url: new_image_src,
					type: "HEAD",
					success: function() {
						$(element).attr('src', new_image_src);

						if(settings['save_size']) {
							$(element).width(width);
							$(element).height(height);
						}
					}
				});
			});
		}
		return this;
	}
})( jQuery );
