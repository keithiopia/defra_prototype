###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

# Assumes the file source/about/template.html.erb exists


data.business.parcels.each do |parcel|
  proxy "/parcel/#{parcel[:id]}.html", "/02-parcel-details.html", :locals => { :parcel => parcel }, :ignore => true
end


###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

activate :directory_indexes

# Path configs
set :build_dir, 'tmp'
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :partials_dir, 'includes'

# Dev-specific configuration
configure :development do
  activate :livereload

 # compass_config do |config|
  #  config.output_style = :expanded
   # config.sass_options = {:debug_info => true}
  #end

end

# Build-specific configuration
configure :build do

  compass_config do |config|
    config.output_style = :expanded
    config.sass_options = {:debug_info => false}
    config.sass_options = {:line_comments => false}
  end

  #activate :minify_css
  activate :minify_javascript

  # Enable cache buster
  # activate :cache_buster

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
