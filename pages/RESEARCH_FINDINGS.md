# Factual Accuracy Research Findings & Corrections

## Research Completed: January 30, 2026

This document summarizes the deep research conducted to verify all technical claims in the Splunk Reference Site.

---

## ✅ VERIFIED CORRECT - No Changes Needed

### 1. Akamai SIEM API JSON Structure
**Source:** Official Akamai techdocs.akamai.com, Sumo Logic docs, Cortex XSOAR

The Akamai SIEM API returns JSON with three main objects:
- `attackData` - Contains attack-related fields
- `httpMessage` - Contains HTTP request/response details  
- `geo` - Contains geolocation data

**Correct field names (verified from official docs):**

```json
{
  "format": "json",
  "type": "akamai_siem",
  "version": "1.0",
  "attackData": {
    "clientIP": "52.91.36.10",
    "configId": "14227",
    "policyId": "qik1_26545",
    "rules": "base64encoded;semicolon;delimited",
    "ruleVersions": "base64;encoded",
    "ruleMessages": "base64;encoded",
    "ruleTags": "base64;encoded",
    "ruleData": "base64;encoded",
    "ruleSelectors": "base64;encoded",
    "ruleActions": "base64;encoded"
  },
  "httpMessage": {
    "requestId": "1158db1758e37bfe67b7c09",
    "start": "1627663284",
    "protocol": "HTTP/1.1",
    "method": "GET",
    "host": "www.example.com",
    "port": "80",
    "path": "/",
    "query": "...",
    "status": "403",
    "bytes": "266",
    "requestHeaders": {...},
    "responseHeaders": {...}
  },
  "geo": {
    "asn": "14618",
    "city": "ASHBURN",
    "continent": "288",
    "country": "US",
    "regionCode": "VA"
  }
}
```

**Status:** ✅ Site is CORRECT

### 2. Akamai WAF Rule IDs
**Source:** Akamai documentation, OWASP CRS

Akamai uses OWASP Core Rule Set (CRS) based rule IDs:
- 950001, 950002 - SQL Injection
- 941100, 941110 - XSS
- 930100, 930110 - Path Traversal/LFI
- 932100 - Remote Command Execution
- 920350 - Rate Limiting
- 910100 - Bot Detection

**Status:** ✅ Site is CORRECT - These are valid OWASP ModSecurity CRS rule IDs

### 3. MITRE ATT&CK Mappings
**Source:** attack.mitre.org (official)

| Technique | Name | Use in Site |
|-----------|------|-------------|
| T1621 | Multi-Factor Authentication Request Generation | MFA fatigue detection ✅ |
| T1110 | Brute Force | Auth failure detection ✅ |
| T1190 | Exploit Public-Facing Application | SQL injection ✅ |
| T1189 | Drive-by Compromise | XSS detection ✅ |
| T1083 | File and Directory Discovery | Path traversal ✅ |
| T1059 | Command and Scripting Interpreter | Command injection ✅ |
| T1595 | Active Scanning | Bot detection ✅ |
| T1078 | Valid Accounts | Account compromise ✅ |
| T1556 | Modify Authentication Process | Auth bypass ✅ |
| T1498 | Network Denial of Service | DDoS detection ✅ |

**Status:** ✅ All MITRE mappings are CORRECT

### 4. Splunk CIM Data Model Names & Fields
**Source:** Splunk official documentation (docs.splunk.com, help.splunk.com)

**Data Models (verified):**
- `datamodel=Web` ✅
- `datamodel=Authentication` ✅
- `datamodel=Network_Traffic` ✅
- `datamodel=Intrusion_Detection` ✅
- `datamodel=Endpoint` ✅

**CIM Authentication Fields (verified):**
- src, dest, user, action, app, signature, authentication_method, src_user, user_id

**CIM Web Fields (verified):**
- src, dest, url, http_method, status, action, user, bytes_in, bytes_out

**Status:** ✅ Site is CORRECT

### 5. Azure AD/Entra ID Error Code 500121
**Source:** Microsoft Learn documentation, Microsoft Q&A

Error code 500121 = "Authentication failed during strong authentication request"
- User didn't complete MFA prompt
- User timed out
- User selected "Not me" or reported fraud
- MFA configuration issue

**Status:** ✅ Site is CORRECT - This is the proper error code for MFA failures

### 6. Splunk REST Endpoints
**Source:** Splunk documentation

All REST endpoints verified correct:
- `/services/data/indexes`
- `/services/saved/searches`
- `/services/apps/local`
- `/services/data/inputs/http`
- `/services/authentication/users`
- `/services/server/info`
- `/services/datamodel/acceleration`

**Status:** ✅ Site is CORRECT

### 7. Splunk Cloud URL Formats
**Source:** Splunk Cloud documentation

- Search Head: `https://<stack>.splunkcloud.com`
- HEC: `https://http-inputs-<stack>.splunkcloud.com:443/services/collector/event`
- Forwarders: `inputs1.<stack>.splunkcloud.com:9997`

**Status:** ✅ Site is CORRECT

### 8. Splunk TA Names
**Source:** Splunkbase official app listings

| TA Name | Vendor | Status |
|---------|--------|--------|
| Splunk_TA_windows | Windows | ✅ Correct |
| Splunk_TA_microsoft-cloudservices | Azure/O365 | ✅ Correct |
| Splunk_TA_Akamai | Akamai | ✅ Correct |
| Splunk_TA_paloalto | Palo Alto | ✅ Correct |
| Splunk_TA_cisco-networks | Cisco | ✅ Correct |
| Splunk_TA_crowdstrike | CrowdStrike | ✅ Correct |
| Splunk_SA_CIM | CIM | ✅ Correct |

**Status:** ✅ Site is CORRECT

### 9. Standard Ports
**Source:** Splunk documentation

- HEC: 443 (HTTPS) or 8088 ✅
- Universal Forwarder: 9997 ✅  
- Syslog: 514 (UDP/TCP) ✅

**Status:** ✅ Site is CORRECT

---

## ⚠️ NEEDS MINOR UPDATES

### 1. ESCU Detection Count
**Current claim:** "1,900+ pre-built detections"
**Research finding:** The count changes with each release. As of ESCU 5.0 (Dec 2024), the exact count varies.

**Correction:** Change to "1,500+ pre-built detections" or "Hundreds of pre-built detections" to avoid outdated specifics.

**Files to update:** splunk-apps.html, waf-onboarding.html

### 2. Akamai Sourcetype
**Current claim:** `akamai:siem`
**Research finding:** The official Akamai SIEM Integration app uses `akamaisiem` (no colon)

**Correction:** Keep `akamai:siem` as it's commonly used, but add note that official app uses `akamaisiem`

**Files to update:** Add note to vendor-akamai.html

### 3. Azure/Entra ID Sourcetypes
**Current claim:** `azure:aad:signin`, `azure:aad:audit`
**Research finding:** Multiple valid sourcetypes exist depending on ingestion method:
- `azure:monitor:aad` (via EventHub with Cloud Services TA)
- `ms:aad:signin`, `ms:aad:audit` (via Office 365 TA)
- `azure:aad:signin`, `azure:aad:audit` (older format)

**Correction:** Note that sourcetype depends on ingestion method/TA used

### 4. CyberArk Identity Sourcetype
**Current claim:** `cyberark:identity:audit`
**Research finding:** CyberArk documentation shows `iis:events` for Splunk Add-on v2/v3

**Correction:** Update to reflect that sourcetype depends on version:
- Splunk Add-on v2/v3: `iis:events`
- Custom/syslog: varies by configuration

**Files to update:** vendor-cyberark.html, data-flow.html

### 5. CyberArk Event Types
**Current claim:** `Cloud.Core.MfaAuthentication`, `Cloud.Core.MfaDenied`
**Research finding:** These appear to be valid CyberArk Identity event types, but exact naming may vary by version

**Correction:** Add note that event type names should be verified against actual logs

---

## 📋 SUMMARY OF CHANGES NEEDED

| Item | Current | Correction | Priority |
|------|---------|------------|----------|
| ESCU count | "1,900+" | "1,500+" or remove specific number | Low |
| Akamai sourcetype | akamai:siem | Add note about akamaisiem | Low |
| Azure sourcetypes | azure:aad:signin | Add note about multiple options | Low |
| CyberArk sourcetype | cyberark:identity:audit | Update or add note | Medium |

---

## ✅ NO ACTION REQUIRED

The following items were verified as factually accurate:
- All SPL syntax
- All MITRE ATT&CK mappings
- All CIM data model names and fields
- All REST API endpoints
- All Splunk Cloud URL formats
- All Splunk TA names
- All port numbers
- Akamai SIEM JSON structure
- Azure error code 500121
- OWASP rule IDs

---

## Verification Commands

Users can verify data in their environment with:

```spl
# Check actual Akamai sourcetype
| metadata type=sourcetypes index=* | search sourcetype=*akamai*

# Check actual CyberArk sourcetype  
| metadata type=sourcetypes index=* | search sourcetype=*cyberark*

# Check actual Azure sourcetype
| metadata type=sourcetypes index=* | search sourcetype=*azure* OR sourcetype=*aad*

# View Akamai field names
index=YOUR_AKAMAI_INDEX earliest=-1h | head 1 | fieldsummary

# View CyberArk field names
index=YOUR_CYBERARK_INDEX earliest=-1h | head 1 | fieldsummary

# View Azure field names
index=YOUR_AZURE_INDEX earliest=-1h | head 1 | fieldsummary
```

---

*Research completed using official documentation from: Akamai, Splunk, Microsoft, MITRE ATT&CK*
