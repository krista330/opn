Under SCC mode, Databricks clusters no longer use the default public IP ranges published in the "Outbound from Azure Databricks control plane" documentation.

Instead, all outbound traffic from the clusters is routed through the Virtual Network (VNet) associated with the workspace.

If a NAT Gateway is configured for the VNet, the public IP address of the NAT Gateway becomes the new source IP for all outbound connections, including those to Azure services such as Key Vault, Storage Accounts, etc.

In environments where no NAT Gateway is explicitly configured, Azure may still assign an ephemeral outbound IP through default mechanisms. However, this IP is subject to change and may not be stable for allowlisting purposes.

⚠️ Impact on External Resources (e.g., Key Vault):
Any services with firewall restrictions (such as Azure Key Vault or Storage Accounts) that were previously configured to allow access based on Databricks’ published outbound IPs must be updated.

Specifically, those services must now include the public IP address(es) of the VNet’s NAT Gateway in their access control lists (ACLs) to maintain uninterrupted access.

✅ Action Required:
Identify the public IP(s) associated with the NAT Gateway used by your Databricks workspace.

Update the Networking settings of Key Vault (or other services) to allow these IP addresses.

Optionally remove the previously configured Databricks outbound IPs from the access list if they are no longer applicable.
















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
