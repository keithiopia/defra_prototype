require "rubygems"

require "rack"
require "middleman/rack"
require "rack/contrib/try_static"
require "rack/rewrite"

# Build the static site when the app boots
# `bundle exec middleman build`

# Enable proper HEAD responses
use Rack::Head

# Enable basic auth for password protection
use Rack::Auth::Basic, "RPA prototypes. Please login." do |username, password|
  [username, password] == [ENV['SITE_USERNAME'], ENV['SITE_PASSWORD']]
end

# Attempt to serve static HTML files
use Rack::TryStatic,
    :root => "tmp",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

# Serve a 404 page if all else fails
run lambda { |env|
  [
    404,
    {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=60"
    },
    File.open("tmp/404/index.html", File::RDONLY)
  ]
}
