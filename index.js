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
  
