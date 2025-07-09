Supporting Documentation (Microsoft):
https://learn.microsoft.com/en-us/azure/databricks/security/network/front-end/ip-access-list-workspace

Enabling Secure Cluster Connectivity (SCC) ensures that compute resources (clusters) establish outbound connections to the control plane via a secure tunnel. This enhances security by preventing the control plane from directly initiating inbound connections to the cluster nodes.

However, when IP Access Lists are also enabled, network access to the workspace’s web application and REST APIs is restricted to explicitly allowed IP ranges.

As a result:
The control plane's public IPs must be included in the IP Access List; otherwise, critical platform services such as job orchestration, cluster lifecycle management, and REST API calls from the control plane may be denied access by your own security settings.

📌 Key Points:
The control plane continues to communicate with the workspace via public IP addresses, even with SCC enabled.

IP Access Lists enforce workspace-level access control, affecting:

Web UI access

REST API calls (e.g., cluster creation, notebook commands)

Authentication and token issuance

If the control plane’s public IPs are not explicitly allow-listed, it may be blocked from accessing your workspace, resulting in:

Cluster failures

Job submission errors

API timeouts or authentication issues

📘 Supporting Documentation (Microsoft):
"If you use IP access lists, you must add the new outbound IP addresses to the allow list for your workspace by August 4, 2024 to avoid service disruptions."

"The control plane communicates with your workspace using public IPs. These IPs must be allowed if access restrictions are in place, even with Secure Cluster Connectivity enabled."

— Azure Databricks IP and domain requirements by region

✅ Summary:
SCC protects the compute plane; IP Access Lists protect the workspace.
To ensure uninterrupted operation, the control plane's public IPs must be allow-listed when both features are enabled.
