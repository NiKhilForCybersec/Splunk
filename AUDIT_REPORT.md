# Splunk Reference Site - Factual Accuracy Audit Report

## Summary
This document lists all items that need verification for factual accuracy. Items are categorized by risk level and type.

---

## 🔴 HIGH PRIORITY - Verify These First

### 1. ESCU Detection Count (splunk-apps.html, waf-onboarding.html)
**Claim:** "1,900+ pre-built detections"
**Location:** Lines 403-404 in splunk-apps.html
**Status:** NEEDS VERIFICATION
**Note:** This number changes with each ESCU release. Current count may be different. Check latest ESCU release notes.

### 2. Akamai SIEM API Field Names (vendor-akamai.html)
**Claims:**
- `attackData.clientIP`
- `attackData.configId`
- `attackData.rules{}.ruleId`
- `attackData.rules{}.ruleTag`
- `attackData.rules{}.ruleAction`
- `httpMessage.method`
- `httpMessage.host`
- `httpMessage.path`
- `httpMessage.status`
- `geo.country`
- `geo.city`

**Status:** NEEDS VERIFICATION against actual Akamai SIEM API documentation
**Note:** Field names must match exactly what Akamai sends. Check your actual Akamai logs.

### 3. Akamai WAF Rule IDs (lookups.html, vendor-akamai.html)
**Claims:**
| Rule ID | Description |
|---------|-------------|
| 950001 | SQL Injection Attack |
| 950002 | SQL Injection - Blind |
| 941100 | XSS Attack Detected |
| 941110 | XSS Filter - Category 1 |
| 930100 | Path Traversal Attack |
| 930110 | Path Traversal - Encoded |
| 932100 | Remote Command Execution |
| 920350 | IP Blocked by Rate Limit |
| 910100 | Bot Detection - Bad Bot |

**Status:** NEEDS VERIFICATION
**Note:** These are based on OWASP ModSecurity CRS, but Akamai may use different IDs. Verify against your Akamai ruleset.

### 4. CyberArk Identity Sourcetype (vendor-cyberark.html, data-flow.html)
**Claim:** `sourcetype=cyberark:identity:audit`
**Status:** NEEDS VERIFICATION
**Note:** Verify the actual sourcetype used by your CyberArk Identity deployment. It may differ based on TA version or custom configuration.

### 5. CyberArk Event Types
**Claims:**
- `Cloud.Core.MfaAuthentication`
- `Cloud.Core.MfaDenied`

**Status:** NEEDS VERIFICATION
**Note:** Verify these event type names match your actual CyberArk logs.

### 6. Azure/Entra ID Field Paths (vendor-entra.html)
**Claims:**
- `properties.userPrincipalName`
- `properties.ipAddress`
- `properties.status.errorCode`
- `properties.location.city`
- `properties.location.countryOrRegion`
- `properties.mfaDetail.authMethod`

**Status:** NEEDS VERIFICATION
**Note:** These match Azure's standard schema but verify against your actual logs.

### 7. Azure Sign-In Error Codes
**Claim:** Error code `500121` for MFA required
**Location:** vendor-cyberark.html line 641
**Status:** NEEDS VERIFICATION
**Note:** Verify this is the correct error code for MFA challenge in your environment.

---

## 🟠 MEDIUM PRIORITY - Should Verify

### 8. MITRE ATT&CK Mappings
**Claims across multiple pages:**
| Technique | Description | Used For |
|-----------|-------------|----------|
| T1498 | Network Denial of Service | DDoS detection |
| T1110 | Brute Force | Auth failures |
| T1190 | Exploit Public-Facing Application | SQLi |
| T1189 | Drive-by Compromise | XSS |
| T1083 | File and Directory Discovery | Path traversal |
| T1059 | Command and Scripting Interpreter | CMDi |
| T1595 | Active Scanning | Bot detection |
| T1621 | Multi-Factor Authentication Request Generation | MFA fatigue |
| T1078 | Valid Accounts | Account compromise |
| T1556 | Modify Authentication Process | Auth bypass |

**Status:** NEEDS VERIFICATION
**Note:** Verify mappings match MITRE's official definitions.

### 9. Splunk Cloud URLs (multiple pages)
**Claims:**
- Search Head: `https://<stack>.splunkcloud.com`
- HEC: `https://http-inputs-<stack>.splunkcloud.com:443/services/collector`
- Forwarder: `inputs1.<stack>.splunkcloud.com:9997`

**Status:** LIKELY CORRECT but verify format for your specific deployment (Victoria vs Classic)

### 10. Splunk TA Names (splunk-apps.html)
**Claims:**
| TA Name | Vendor |
|---------|--------|
| Splunk_TA_windows | Windows |
| Splunk_TA_microsoft-cloudservices | Azure/O365 |
| Splunk_TA_Akamai | Akamai |
| Splunk_TA_paloalto | Palo Alto |
| Splunk_TA_cisco-networks | Cisco |
| Splunk_TA_crowdstrike | CrowdStrike |
| Splunk_SA_CIM | CIM |

**Status:** LIKELY CORRECT - these are official Splunk TA names
**Note:** Verify specific TAs are actually installed in your environment

### 11. CIM Data Model Names (multiple pages)
**Claims:**
- `datamodel=Web`
- `datamodel=Authentication`
- `datamodel=Network_Traffic`
- `datamodel=Endpoint`
- `datamodel=Intrusion_Detection`

**Status:** CORRECT - these are official Splunk CIM data model names

### 12. CIM Field Names (cheat-sheets.html)
**Claims for Web model:**
- src, dest, url, http_method, status, action, user, bytes_in, bytes_out

**Claims for Authentication model:**
- src, dest, user, action, app, src_user, signature

**Status:** CORRECT - these are standard CIM fields

---

## 🟡 LOW PRIORITY - Generic/Assumed Values

### 13. Detection Thresholds (multiple pages)
**All threshold values are EXAMPLES and should be tuned:**

| Detection | Threshold | Notes |
|-----------|-----------|-------|
| High volume blocked | count > 100 (5 min) | May need adjustment based on baseline |
| Auth failures | count > 5 | Standard but may need tuning |
| Statistical anomaly | 3 * stdev | Standard statistical approach |
| MFA fatigue | Multiple prompts in short time | Define "multiple" and "short time" |

**Status:** EXAMPLES ONLY - must be tuned to your environment

### 14. Time Ranges (multiple pages)
- Most searches use `earliest=-24h`, `-7d`, `-15m`, `-1h`
- These are reasonable defaults but should be adjusted based on your data volume

### 15. Index Names (multiple pages)
**Assumed index names:**
- `akamai` - for Akamai WAF logs
- `cyberark` - for CyberArk Identity logs
- `azure` - for Azure/Entra ID logs

**Status:** PLACEHOLDER - replace with your actual index names

### 16. Splunk Ports (data-inputs.html)
**Claims:**
- HEC: 443 or 8088
- Forwarder: 9997
- Syslog: 514 (UDP/TCP)

**Status:** CORRECT - these are Splunk defaults

---

## 🟢 VERIFIED CORRECT

### 17. SPL Syntax (all pages)
- All SPL commands use correct syntax
- tstats, stats, eval, where, table, etc. are correctly used

### 18. REST Endpoints (multiple pages)
**All REST endpoints are correct:**
- `/services/data/indexes`
- `/services/saved/searches`
- `/services/apps/local`
- `/services/data/inputs/http`
- `/services/authentication/users`
- `/services/server/info`
- `/services/datamodel/acceleration`

### 19. Configuration File Structure (props-transforms.html)
- props.conf attributes are correct
- transforms.conf attributes are correct
- File paths and precedence are accurate

### 20. strptime Format Codes (troubleshooting.html)
- All TIME_FORMAT examples use correct strptime codes

---

## 📋 Action Items for You

1. **Verify Akamai field names** - Pull a sample event from your Akamai index and compare field names

2. **Verify CyberArk field names** - Pull a sample event from your CyberArk index

3. **Verify Azure/Entra field names** - Pull a sample event from your Azure index

4. **Confirm actual index names** - Replace placeholder index names with your real ones

5. **Verify WAF rule IDs** - Check if Akamai uses OWASP CRS rule IDs or their own

6. **Tune thresholds** - All detection thresholds are examples that need baseline analysis

7. **Verify ESCU detection count** - Check current ESCU release notes for accurate count

8. **Verify MITRE mappings** - Spot-check against attack.mitre.org

---

## Quick Verification Commands

Run these in your Splunk to verify field names:

```spl
# Akamai - see actual fields
index=akamai earliest=-1h | head 1 | fieldsummary

# CyberArk - see actual fields
index=cyberark earliest=-1h | head 1 | fieldsummary

# Azure - see actual fields
index=azure earliest=-1h | head 1 | fieldsummary

# See actual sourcetypes in use
| metadata type=sourcetypes index=* | table sourcetype totalCount
```

---

*Generated: Audit of Splunk Reference Site v3.0*
