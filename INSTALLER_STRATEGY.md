# Installer & Code Signing Strategy

## Code Signing Certificate

### Overview
To build user trust, Absolute Assistant's installer must be digitally signed with a valid code signing certificate. This removes Windows SmartScreen warnings and verifies the executable's authenticity.

### Recommended Approach

#### Option 1: Extended Validation (EV) Code Signing Certificate (Recommended)
- **Cost**: ~$200-400/year (DigiCert, Sectigo, GlobalSign)
- **Timeline**: 1-3 business days after verification
- **Benefits**: 
  - Immediate reputation with Microsoft (no waiting period)
  - Higher trust indicators in Windows
  - Required for Windows Defender SmartScreen reputation
  
**Where to Purchase:**
- DigiCert (most trusted, fastest)
- Sectigo (good value)
- GlobalSign (reliable)

#### Option 2: Standard Code Signing Certificate
- **Cost**: ~$150-250/year
- **Timeline**: 1-3 business days
- **Note**: Requires time to build reputation (first-time installers may still show warnings)

### Implementation Steps

1. **Purchase Certificate** from a trusted Certificate Authority (CA)
2. **Verify Identity** (CA will verify business/individual identity)
3. **Export Certificate** to `.pfx` file with password protection
4. **Store Securely**: 
   - Use environment variables or secure key management
   - Never commit certificate files to version control
   - Add to `.gitignore` immediately

5. **Sign the Executable** during build process:
   ```bash
   # Using signtool (Windows SDK)
   signtool sign /f certificate.pfx /p password /t http://timestamp.digicert.com AbsoluteAssistantSetup.exe
   
   # Or using osslsigncode (cross-platform)
   osslsigncode sign -pkcs12 certificate.pfx -pass password -in AbsoluteAssistantSetup.exe -out AbsoluteAssistantSetup-signed.exe
   ```

6. **Timestamp** the signature (crucial for long-term validity):
   - Include `/t` flag pointing to timestamp server
   - Ensures signature remains valid after certificate expiration

### Automated Build Integration

**GitHub Actions / CI Pipeline:**
```yaml
- name: Code Sign Executable
  env:
    CERT_PASSWORD: ${{ secrets.CODE_SIGN_PASSWORD }}
  run: |
    signtool sign /f ${{ secrets.CODE_SIGN_CERT }} /p $CERT_PASSWORD /t http://timestamp.digicert.com AbsoluteAssistantSetup.exe
```

### Verification
After signing, verify the signature:
```bash
signtool verify /pa /v AbsoluteAssistantSetup.exe
```

## Installer Branding

### Professional Appearance

#### Installer Framework Options

1. **NSIS (Nullsoft Scriptable Install System)** - Free, Open Source
   - Highly customizable
   - Professional appearance with modern UI plugins
   - Good documentation

2. **Inno Setup** - Free, Open Source
   - Windows-native look and feel
   - Easy wizard creation
   - Excellent for Windows applications

3. **Electron Builder** - If app is Electron-based
   - Built-in code signing support
   - Automatic NSIS/Inno Setup generation

4. **Commercial Solutions**
   - InstallShield
   - Advanced Installer
   - Actual Installer

### Branding Elements to Include

1. **Installation Wizard UI**
   - Custom logo/icon on welcome screen
   - Professional color scheme matching brand
   - Clear progress indicators
   - "Absolute Assistant" branding throughout

2. **Metadata**
   - Product Name: "Absolute Assistant"
   - Publisher: Your registered company name
   - Version: Semantic versioning (e.g., 1.0.0)
   - Description: Clear, professional description

3. **Installation Options**
   - Default installation path: `C:\Program Files\Absolute Assistant`
   - Start menu shortcuts
   - Desktop shortcut (optional, user choice)
   - Launch after installation option

4. **Uninstaller**
   - Professional uninstaller with company branding
   - Clean removal of all files and registry entries

### Example NSIS Script Structure
```nsis
; Define branding
Name "Absolute Assistant"
BrandingText "Absolute Assistant"
InstallDir "$PROGRAMFILES\Absolute Assistant"

; Add custom UI
!include "MUI2.nsh"

; Welcome page with logo
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; Modern installer appearance
!define MUI_ICON "assets\icon.ico"
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "assets\header.bmp"
```

## Virus Scan Badges

### Multi-Engine Scanning

Upload installer to these services for public scanning:

1. **VirusTotal** - https://www.virustotal.com
   - Free scanning by 60+ antivirus engines
   - Public report URL can be displayed on website
   - Example: `https://www.virustotal.com/gui/file/[hash]/detection`

2. **Jotti's Malware Scan** - https://virusscan.jotti.org
   - Additional verification

3. **Hybrid Analysis** - https://www.hybrid-analysis.com
   - Deep behavioral analysis

### Display on Website

Add badges/links to the trust section:
- "Scanned by 60+ antivirus engines" (VirusTotal)
- "No threats detected" badge
- Link to public scan results

## Windows SmartScreen Reputation

### Building Reputation

Even with code signing, new applications need time to build reputation:

1. **Initial Period (0-100 downloads)**
   - Users may see "Unknown Publisher" warning
   - Encourage clicking "More info" → "Run anyway"
   - Show clear instructions on download page

2. **Growing Reputation (100-1000 downloads)**
   - Warnings become less frequent
   - SmartScreen learns from user behavior

3. **Established Reputation (1000+ downloads)**
   - No warnings for signed executables
   - Smooth installation experience

### Strategies to Build Reputation Faster

- Encourage early adopters to install (volume matters)
- Request users report false positives
- Submit to Windows Defender for manual review
- Maintain clean release history (no malware reports)

## Security Best Practices

1. **Protect Certificate Private Key**
   - Store in hardware security module (HSM) if possible
   - Use strong password protection
   - Limit access to build systems only

2. **Secure Build Pipeline**
   - Sign only on secure, controlled build servers
   - Audit all signed executables
   - Maintain signed binary checksums

3. **Regular Updates**
   - Renew certificate before expiration
   - Re-sign all releases if certificate changes
   - Maintain signing timestamp for old releases

## Display on Download Page

Include trust indicators:
- ✓ Code Signed Certificate badge
- ✓ Virus Scanned (VirusTotal link)
- ✓ Secure Download (HTTPS)
- ✓ Professional Installer
- Instructions: "If Windows shows a warning, click 'More info' to see our verified signature"

