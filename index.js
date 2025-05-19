StorageBlobLogs
| where AuthenticationType == "SAS"
| project TimeGenerated, OperationName, RequesterIPAddress, Uri, StatusCode, AccountName, UserAgentHeader
| sort by TimeGenerated desc



"Migrating from MMK to CMK introduces high operational risk."

Key reasons:

Key misconfiguration or Key Vault unavailability can result in data inaccessibility.

Requires precise setup of access controls, key rotation, and availability zones.

Any errors in CMK management (e.g., key deletion or expiration) may disrupt application access to the storage account.

Unlike MMK, CMK makes the environment more sensitive to human error and system dependencies.

🧩 另一种表达方式（用于决策场合）
"Switching to CMK significantly increases the risk of service disruption due to its complexity and dependency on Key Vault availability and correct key management practices."



"CMK implementation requires additional setup, monitoring, and key rotation processes, increasing management complexity and cost."
"The use of CMK adds infrastructure dependencies (e.g., Key Vault availability), which increases administrative effort and risk."

Recommendation:
We recommend continuing with Microsoft-managed keys (MMK) for the Azure Storage Account.

Rationale:

MMK fully meets our current compliance and security requirements.

It requires no additional configuration or Key Vault integration, ensuring simpler implementation and lower operational risk.

It avoids the cost and complexity associated with managing customer-managed keys (CMK), including rotation and high availability setup.

Unless a future compliance policy mandates direct control of encryption keys, MMK remains the most efficient and cost-effective option for our environment.



| Aspect             | Microsoft-managed Keys (MMK)                               | Customer-managed Keys (CMK)                                         |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| **Compliance**     | Meets general standards (e.g., ISO, GDPR, HIPAA)           | Suitable for strict regulations (e.g., finance, government, FIPS)   |
| **Security**       | Microsoft handles key lifecycle securely and automatically | Full customer control over key creation, rotation, revocation       |
| **Implementation** | Enabled by default, no extra setup                         | Requires setup of Key Vault and role/access configuration           |
| **Cost**           | No additional cost (only storage usage fees)               | Incurs extra cost for Azure Key Vault usage and management overhead |


 We acknowledge the need for additional context around the recommendation of CMK.
CMK is preferred primarily due to the following reasons:
	•	Greater control: Organizations can manage the key lifecycle, including rotation and revocation.
	•	Compliance alignment: CMK allows alignment with industry standards and internal governance.
	•	Audit transparency: CMK supports key access logging for auditing purposes.

In contrast, MMK involves less administrative effort but presents potential risks, including:
	•	Limited visibility into key lifecycle,
	•	Inability to meet specific compliance frameworks requiring user-managed keys,
	•	Dependency on Microsoft’s internal processes for key rotation and retention.


  In addition to availability concerns of Azure Key Vault, using CMK may have performance impacts due to:
	•	Additional latency introduced during encryption/decryption operations,
	•	Potential throttling or rate limits on Key Vault API calls,
	•	Network dependency between services and Key Vault.

We will investigate and document any measurable performance differences through testing and monitoring, and include results in the next version.


CMK introduces operational responsibilities not present with MMK. These include:
	•	Manual or automated key rotation management,
	•	Access policy configuration and periodic review,
	•	Key version tracking and update in dependent services,
	•	Audit logging for key usage and access,
	•	Incident response planning for key compromise scenarios,
	•	Ensuring Key Vault high availability and access permissions.

We will illustrate these activities with examples to highlight the operational complexity and potential burden.
  
