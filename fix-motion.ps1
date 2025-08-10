# PowerShell script to fix framer-motion imports and components

$files = @(
    "src\app\[locale]\about\AboutClient.tsx",
    "src\app\[locale]\contact\ContactClient.tsx", 
    "src\app\[locale]\investment\InvestmentClient.tsx",
    "src\components\sections\HeroSection.tsx"
)

foreach ($file in $files) {
    Write-Host "Fixing $file..."
    
    if (Test-Path $file) {
        # Read file content
        $content = Get-Content $file -Raw
        
        # Remove framer-motion import
        $content = $content -replace "import \{ motion \} from 'framer-motion';\r?\n", ""
        
        # Replace motion components with regular HTML elements
        $content = $content -replace "motion\.section", "section"
        $content = $content -replace "motion\.div", "div"
        $content = $content -replace "motion\.h1", "h1"
        $content = $content -replace "motion\.h2", "h2"
        $content = $content -replace "motion\.h3", "h3"
        $content = $content -replace "motion\.p", "p"
        $content = $content -replace "motion\.span", "span"
        $content = $content -replace "motion\.button", "button"
        
        # Remove motion props (initial, animate, transition, variants, whileInView, viewport)
        $content = $content -replace '\s+initial=\{[^}]*\}', ""
        $content = $content -replace '\s+animate=\{[^}]*\}', ""
        $content = $content -replace '\s+transition=\{[^}]*\}', ""
        $content = $content -replace '\s+variants=\{[^}]*\}', ""
        $content = $content -replace '\s+whileInView=\{[^}]*\}', ""
        $content = $content -replace '\s+viewport=\{[^}]*\}', ""
        
        # Write back to file
        Set-Content $file $content -NoNewline
        
        Write-Host "Fixed $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All files processed!"
