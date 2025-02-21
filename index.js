Slide 1: Title Slide

Monitoring Suspicious IP Access in Azure Using Azure Monitor Alerts

Slide 2: Background, Objective, and Solutions

Background:

A specific IP address was flagged for suspicious access to Azure Key Vault.

No login activity from this IP address has been found in Azure AD logs for the past six months.

Objective:

Implement Azure Monitor Alerts to track future access attempts from this IP address.

Explore additional measures to enhance security and mitigate potential risks.

Additional Solutions for IP Monitoring:

Azure Sentinel (SIEM Solution)

Detect advanced threats using KQL queries.

Automate responses to block malicious IPs.

Azure Firewall & NSG

Block suspicious IPs from accessing resources.

Implement granular network segmentation.

Azure AD Conditional Access

Restrict access from specific IP addresses.

Enforce multi-factor authentication (MFA) for sensitive resources.

Azure Policy

Enforce access control policies for specific IPs.

Monitor compliance across Azure resources.

Key Vault Firewall & Private Endpoints

Restrict access to approved IPs or virtual networks.

Enhance security by isolating sensitive resources.

Slide 3: Why Monitor Suspicious IP Addresses?

Risks of Unmonitored IP Access:

Unauthorized Access: Compromising sensitive information in Azure resources (e.g., Key Vault).

Data Breaches: Potential leakage of confidential secrets, keys, or certificates.

Operational Impact: Undetected access can lead to service disruption.

Benefits of Azure Monitor Alerts:

Real-Time Detection: Immediate notification of suspicious IP access.

Enhanced Security: Continuous monitoring ensures proactive threat mitigation.

Detailed Insights: Provides logs and visibility into access patterns.

Slide 4: Overview of Azure Monitor

What is Azure Monitor?

A comprehensive monitoring solution that tracks and analyzes activity across Azure resources.

Key Capabilities for IP Monitoring:

Log Collection: Aggregates sign-in and activity logs.

Custom Alerts: Set rules to trigger notifications for specific IP access.

Integration: Works with Azure AD, Key Vault, and Log Analytics.

Slide 5: Step 1: Access Azure Monitor

Sign in to the Azure Portal.

Search for Monitor in the top search bar.

Select Azure Monitor from the results.

Tip: Ensure you have necessary permissions to view logs and create alerts.

Slide 6: Step 2: Enable Diagnostic Logs for Key Vault

Navigate to the Azure Key Vault resource.

Select Diagnostic settings from the left menu.

Click + Add diagnostic setting.

Choose AuditEvent (to track access).

Send logs to Log Analytics Workspace.

Save your configuration.

Tip: This ensures Key Vault access attempts are logged and available for analysis.

Slide 7: Step 3: Create a Custom Query for IP Tracking

Open Logs in Azure Monitor.

Choose the Log Analytics Workspace linked to Key Vault



Purge Protection in Azure Key Vault: Business Explanation
Purge Protection is a critical security feature in Azure Key Vault designed to prevent the permanent deletion of cryptographic keys, secrets, and certificates.

When Purge Protection is enabled:

Deleted items enter a soft-delete state and remain recoverable for a retention period of 90 days.
Even users with high-level permissions (including administrators) cannot permanently delete these items before the retention period ends.
This feature adds an extra layer of security, protecting against accidental deletions, insider threats, or malicious attacks.
Business Benefits:
✅ Enhanced Security – Prevents unauthorized or irreversible deletion of critical assets.
✅ Regulatory Compliance – Helps meet compliance requirements by ensuring data retention and recoverability.
✅ Operational Continuity – Reduces risks of downtime by allowing recovery of essential cryptographic keys.

For organizations handling sensitive data and requiring strong business continuity measures, enabling Purge Protection is a best practice to safeguard key vault assets.



Risks of Not Enabling Purge Protection in Azure Key Vault

Failure to enable Purge Protection in Azure Key Vault poses significant security and operational risks, including:

Permanent Data Loss – Without purge protection, deleted keys, secrets, and certificates can be permanently removed, making recovery impossible.
Increased Vulnerability to Malicious Actions – Unauthorized users or compromised accounts can permanently delete critical assets, leading to potential security breaches.
Regulatory and Compliance Risks – Many industry regulations (e.g., GDPR, HIPAA) require robust data protection measures. The inability to recover deleted sensitive information could result in non-compliance.
Operational Disruptions – Accidental or malicious deletion of cryptographic keys may disrupt applications relying on them, leading to downtime and business continuity issues.
Compromised Disaster Recovery – Without purge protection, recovery mechanisms are severely limited, reducing resilience against cyber threats and operational failures.
To mitigate these risks, it is highly recommended to enable Purge Protection to ensure a retention period for deleted resources, enhancing security, compliance, and business continuity.
