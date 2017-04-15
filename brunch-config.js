// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {
	joinTo: 'app.css',
	
	order: {
		before: [	"app/style/sub_itemlist.scss",
				"app/style/sub_func.scss",
				"app/style/style_main.scss"	]
	}
	
	
  }
};

exports.plugins = {
  babel: {presets: ['latest']}
};