Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot '..\public\images\projects\25\cover.png'
$outputDir = Join-Path $PSScriptRoot '..\public\images\projects\25\prototypes'
[System.IO.Directory]::CreateDirectory($outputDir) | Out-Null

$items = @(
  @{ Name='01-user-home.png'; X=38; Y=180; W=210; H=391 },
  @{ Name='02-user-food-street.png'; X=276; Y=180; W=210; H=391 },
  @{ Name='03-user-search.png'; X=516; Y=180; W=210; H=391 },
  @{ Name='04-user-store-detail.png'; X=758; Y=180; W=210; H=391 },
  @{ Name='05-user-confirm-order.png'; X=37; Y=646; W=210; H=364 },
  @{ Name='06-user-delivery-progress.png'; X=276; Y=646; W=210; H=364 },
  @{ Name='07-user-orders.png'; X=516; Y=646; W=210; H=364 },
  @{ Name='08-user-profile.png'; X=758; Y=646; W=210; H=364 },
  @{ Name='09-merchant-dashboard.png'; X=26; Y=1128; W=103; H=295 },
  @{ Name='10-merchant-new-order.png'; X=138; Y=1128; W=103; H=295 },
  @{ Name='11-merchant-fulfillment.png'; X=251; Y=1128; W=103; H=295 },
  @{ Name='12-rider-dashboard.png'; X=511; Y=1128; W=103; H=295 },
  @{ Name='13-rider-route.png'; X=624; Y=1128; W=103; H=295 },
  @{ Name='14-rider-last-100m.png'; X=737; Y=1128; W=103; H=295 }
)

function New-RoundedPath([System.Drawing.RectangleF]$rect, [float]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $arc = New-Object System.Drawing.RectangleF($rect.X, $rect.Y, $diameter, $diameter)
  $path.AddArc($arc, 180, 90)
  $arc.X = $rect.Right - $diameter; $path.AddArc($arc, 270, 90)
  $arc.Y = $rect.Bottom - $diameter; $path.AddArc($arc, 0, 90)
  $arc.X = $rect.X; $path.AddArc($arc, 90, 90)
  $path.CloseFigure()
  return $path
}

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path $sourcePath))
try {
  foreach ($item in $items) {
    $crop = New-Object System.Drawing.Bitmap($item.W, $item.H, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $cropGraphics = [System.Drawing.Graphics]::FromImage($crop)
    try {
      $cropGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $cropGraphics.DrawImage($source, (New-Object System.Drawing.Rectangle(0,0,$item.W,$item.H)), (New-Object System.Drawing.Rectangle($item.X,$item.Y,$item.W,$item.H)), [System.Drawing.GraphicsUnit]::Pixel)
    } finally { $cropGraphics.Dispose() }

    $canvas = New-Object System.Drawing.Bitmap(480, 960, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    try {
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.Clear([System.Drawing.Color]::Transparent)

      $phoneRect = New-Object System.Drawing.RectangleF(48, 38, 384, 884)
      $phonePath = New-RoundedPath $phoneRect 58
      $graphics.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,28,27,25))), $phonePath)

      $screenRect = New-Object System.Drawing.RectangleF(61, 51, 358, 858)
      $screenPath = New-RoundedPath $screenRect 47
      $oldClip = $graphics.Clip
      $graphics.SetClip($screenPath)
      $graphics.Clear([System.Drawing.Color]::FromArgb(255,250,249,246))
      $scale = [Math]::Min($screenRect.Width / $crop.Width, $screenRect.Height / $crop.Height)
      $drawW = [float]($crop.Width * $scale)
      $drawH = [float]($crop.Height * $scale)
      $drawX = [float]($screenRect.X + ($screenRect.Width - $drawW) / 2)
      $drawY = [float]($screenRect.Y + ($screenRect.Height - $drawH) / 2)
      $graphics.DrawImage($crop, $drawX, $drawY, $drawW, $drawH)
      $graphics.Clip = $oldClip

      $islandRect = New-Object System.Drawing.RectangleF(174, 63, 132, 34)
      $islandPath = New-RoundedPath $islandRect 17
      $graphics.FillPath([System.Drawing.Brushes]::Black, $islandPath)

      $target = Join-Path $outputDir $item.Name
      $canvas.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
      $phonePath.Dispose(); $screenPath.Dispose(); $islandPath.Dispose()
    } finally {
      $graphics.Dispose(); $canvas.Dispose(); $crop.Dispose()
    }
  }
} finally { $source.Dispose() }

Write-Output "Generated $($items.Count) prototypes in $outputDir"
