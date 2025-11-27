# License Key Format Explanation

## Why They Look Different

The license key you receive via **email** is **different** from what you see in **Supabase**, and this is intentional for security.

### Email Contains: **Raw License Key** (UUID Format)
```
Example: 550e8400-e29b-41d4-a716-446655440000
```
- This is the **actual license key** customers enter in the app
- Format: UUID (8-4-4-4-12 hex characters)
- This is what users need to activate the software

### Supabase Contains: **SHA256 Hash** (64 Hex Characters)
```
Example: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```
- This is the **hash** (one-way encryption) of the raw key
- Format: 64 hexadecimal characters
- **The raw key is never stored** in the database for security

## How They Relate

1. When a license is created:
   - System generates a random UUID (raw key)
   - System creates SHA256 hash of that UUID
   - **Raw key** → Sent via email to customer
   - **Hash** → Stored in Supabase database

2. When verifying a license:
   - Customer enters the raw key in the app
   - App hashes the raw key using SHA256
   - App looks up the hash in the database
   - If hash matches, license is valid

## Security Benefits

- ✅ **Raw keys are never stored** - Even if database is compromised, attackers can't see the actual keys
- ✅ **One-way hashing** - You can't reverse the hash to get the raw key
- ✅ **Email contains the key** - Only the customer who receives the email has the activation key

## Verification

You can verify a raw license key matches a hash:

```bash
# Using the verify endpoint
curl -X POST https://www.lancelot.world/api/verify-license-key \
  -H "Content-Type: application/json" \
  -d '{"rawLicenseKey": "550e8400-e29b-41d4-a716-446655440000"}'
```

Or hash it yourself:
```bash
# Using openssl
echo -n "550e8400-e29b-41d4-a716-446655440000" | openssl dgst -sha256

# Should match the hash stored in Supabase
```

## Summary

- **Email** = Raw license key (what customer uses)
- **Database** = Hash of raw key (for verification)
- **They are different by design** ✅

