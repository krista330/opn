1. Executive Summary

In order to minimize the security exposure associated with Shared Access Signatures (SAS) in Azure Storage, it is recommended to use short-lived tokens (e.g., valid for 1 hour or less). This document outlines the justification for this best practice, as well as the potential risks and limitations.

⸻

2. Justification for Short-lived SAS (≤ 1 Hour)

a. Minimized Security Exposure
	•	SAS tokens provide direct access to storage resources.
	•	If a SAS is compromised, the shorter its lifetime, the lower the potential damage.
	•	A 1-hour expiry window significantly reduces risk compared to longer-lived tokens (e.g., 24 hours or more).

b. Alignment with the Principle of Least Privilege
	•	Short-lived SAS tokens enforce the concept of granting minimal necessary access for the shortest required duration.
	•	Reduces the attack surface, especially in distributed or public environments.

c. Improved Incident Response
	•	In the event of token leakage, the maximum exposure time is automatically limited by the token expiry.
	•	There’s no need for manual revocation or account key rotation in most cases.

d. Best Practice Endorsement
	•	Microsoft and industry standards recommend using short-lived SAS as a baseline security measure for temporary access to storage services.

⸻

3. Risks and Operational Considerations

a. Impact on Long-running Operations
	•	Uploads, downloads, or background jobs that run longer than 1 hour may fail if the SAS expires mid-operation.
	•	This can impact performance or lead to partial/incomplete data transfer.

b. Increased Management Complexity
	•	Shorter token lifespans require more frequent SAS regeneration.
	•	This may necessitate implementing token renewal logic or API endpoints to provide refreshed SAS tokens securely.

c. Incompatibility with Offline Scenarios
	•	Devices operating offline or in low-connectivity environments may not be able to retrieve new tokens in time.

d. Not All Services Support Policy Enforcement
	•	Azure Table and Queue storage do not support Stored Access Policies, making centralized control over expiry more difficult in those services.

⸻

4. Recommendations
	•	Enforce short-lived SAS (≤ 1 hour) where feasible, especially in public, browser-based, or untrusted environments.
	•	Use Stored Access Policies to enforce expiry and permissions in Blob and File services.
	•	For more complex or sensitive scenarios, consider Azure AD–based access control as a more secure alternative to SAS.
	•	Ensure long-running processes are equipped with token renewal or fallback mechanisms to avoid disruption.

⸻

5. Conclusion

Using short-lived SAS tokens is a fundamental security best practice to mitigate risks associated with storage access in Azure. While it introduces some operational overhead, the trade-off is justified by the significantly reduced security exposure.
