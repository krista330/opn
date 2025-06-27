1. 🔧 Operational Complexity
Zone Redundancy cannot be enabled after account creation or added to existing regions.
→ To enable it, we must add a new region with isZoneRedundant = true and manually perform a write region failover.

The procedure involves:

Adding a new region that supports Availability Zones

Failing over the write region to the new zone-redundant region

Optionally removing the original region

Requires careful coordination, as temporary disruption (few seconds to minutes) may occur during region switch.

📌 Operational impact is moderate and requires planned maintenance.

2. 📈 Improved SLA
Enabling Zone Redundancy increases the availability SLA from 99.99% to 99.995%.

99.99%: ~4.38 minutes of downtime/month

99.995%: ~2.19 minutes of downtime/month

Ensures continued service availability even if one availability zone within the region fails.

Strongly recommended for production-grade, customer-facing, or mission-critical workloads.

📌 SLA improvement is significant and justifies the redundancy for critical systems.

3. 💰 Cost Impact
No additional fee for the Zone Redundancy feature itself, but:

RU/s and storage consumption may increase due to replica management and cross-zone operations.

Typical cost increase is estimated at +10–30% depending on the write/read load and data size.

In autoscale mode, the cost impact is proportional to actual usage rather than provisioned maximums.

📌 Cost increase is moderate and predictable; planning for ~20–30% overhead is reasonable.

✅ Conclusion
Zone Redundancy provides meaningful resilience improvements for Cosmos DB accounts, with manageable operational changes and acceptable cost increase.
We recommend enabling it for production workloads where availability and reliability are critical.




	

Your Cosmos DB instance will be deployed in only one Availability Zone (AZ) within a region. If that AZ fails, the service will become unavailable until Azure restores the zone.
⏳ Unpredictable Recovery Time	
	Without zone redundancy, recovery fully depends on Azure's restoration of the failed AZ. The recovery time (RTO) is unpredictable, possibly lasting from several minutes to hours.
❌ Lower SLA	
	Microsoft offers 99.995% SLA only if Zone Redundancy is enabled. Without it, you're operating under a lower availability SLA.
📉 Business Impact	
	If your application relies on Cosmos DB for real-time reads/writes, an AZ failure could cause downtime, data loss, or customer impact.
There is no direct way to enable zone redundancy for an existing region.
you must re-add the region with the setting

✅ 1. For non-critical workloads
If the application can tolerate some downtime and doesn't serve end users directly, zone redundancy may not be necessary.

✅ 3. For cost-sensitive environments
If high availability isn't essential and cost optimization is a priority, skipping zone redundancy might be acceptable.

 Workload is Non-Critical
The database supports internal or non-customer-facing services.

Temporary downtime is acceptable and has limited impact on business operations.

The data is either non-transactional, rebuildable, or used for batch/offline processing.

2. Cost Efficiency Is Prioritized
The workload handles high throughput and large storage, and enabling zone redundancy would result in increased compute and replication cost.

As the availability SLA trade-off is acceptable to the business, the decision prioritizes cost optimization over zone-level resilience.

A business continuity plan (BCP) is in place to restore services if need
		
	
	
	
https://learn.microsoft.com/en-us/answers/questions/1526971/enabling-availability-zones-for-azure-cosmos-db-fo?utm_source=chatgpt.com


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
