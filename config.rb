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
# Set up proxies for each of the parcel-specific pages

data.business.parcels.each do |parcel|
  proxy "/#{parcel[:id]}.html", "/parcel-details.html", :locals => { :parcel => parcel }, :ignore => true

  proxy "/#{parcel[:id]}/change-land-parcel.html", "/change-land-parcel.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/change-land-parcel-split.html", "/change-land-parcel-split.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/change-land-parcel-merge.html", "/change-land-parcel-merge.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/change-land-parcel-change.html", "/change-land-parcel-change.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/change-land-parcel-date.html", "/change-land-parcel-date.html", :locals => { :parcel => parcel }, :ignore => true


  proxy "/#{parcel[:id]}/buffer-strips.html", "/buffer-strips.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/buffer-strips-description.html", "/buffer-strips-description.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/buffer-strips-date.html", "/buffer-strips-date.html", :locals => { :parcel => parcel }, :ignore => true


  proxy "/#{parcel[:id]}/undefined-feature.html", "/undefined-feature.html", :locals => { :parcel => parcel }, :ignore => true


  proxy "/#{parcel[:id]}/get-started.html", "/get-started.html", :locals => { :parcel => parcel }, :ignore => true


  proxy "/#{parcel[:id]}/split-parcel.html", "/split-parcel.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/split-parcel-done.html", "/split-parcel-done.html", :locals => { :parcel => parcel }, :ignore => true

  proxy "/#{parcel[:id]}/land-use.html", "/land-use.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/boundary-features.html", "/boundary-features.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/other-features.html", "/other-features.html", :locals => { :parcel => parcel }, :ignore => true



  proxy "/#{parcel[:id]}/arable.html", "/arable.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/arable-area.html", "/arable-area.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/arable-date.html", "/arable-date.html", :locals => { :parcel => parcel }, :ignore => true


  proxy "/#{parcel[:id]}/organic-status.html", "/organic-status.html", :locals => { :parcel => parcel }, :ignore => true

  proxy "/#{parcel[:id]}/add-feature.html", "/add-feature.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/add-feature-details.html", "/add-feature-details.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/add-feature-draw.html", "/add-feature-draw.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/add-feature-date.html", "/add-feature-date.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/add-feature-date-2.html", "/add-feature-date-2.html", :locals => { :parcel => parcel }, :ignore => true

  proxy "/#{parcel[:id]}/edit-feature.html", "/edit-feature.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/edit-feature-type.html", "/edit-feature-type.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/edit-feature-date.html", "/edit-feature-date.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/edit-feature-multi-use.html", "/edit-feature-multi-use.html", :locals => { :parcel => parcel }, :ignore => true

  proxy "/#{parcel[:id]}/remove-feature.html", "/remove-feature.html", :locals => { :parcel => parcel }, :ignore => true
  proxy "/#{parcel[:id]}/remove-feature-date.html", "/remove-feature-date.html", :locals => { :parcel => parcel }, :ignore => true

end


###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

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

  compass_config do |config|
    # config.output_style = :expanded
    # config.sass_options = {:debug_info => true}
    config.additional_import_paths = ["assets/govuk_frontend_toolkit/stylesheets"]
  end

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
