Based on the previous assessment, option A appears to be the more suitable choice.

However, considering the VAPT recommendations and cost efficiency, option B can also be used for static code analysis. We kindly request the MOL team to re-evaluate both tools and provide further guidance.



Prevents Exposure to the Public Internet
When public IPs are enabled, each worker and driver node in your Databricks cluster can potentially be assigned a public IP address, meaning it is accessible from the internet (though firewalled).

By disabling public IPs, all network interfaces remain private within the Azure VNet — completely removing the attack surface from the internet.

This ensures that only internal systems or trusted endpoints can communicate with Databricks resources.

2. Leverages Azure NSGs (Network Security Groups) for Strict Access Control
With public IPs disabled, all cluster traffic flows through private subnets managed by you.

You can apply fine-grained NSG rules at the subnet level to:

Allow or deny access based on IP ranges

Limit traffic to specific ports/protocols

Enforce segmentation between services (e.g., only certain services can talk to Databricks)

5. Mitigates Common Cloud Security Threats
Threat Type	Mitigation by Disabling Public IP
Port scanning & brute-force	No public entry points to scan or exploit
Data exfiltration via outbound rules	Control via NSGs or Azure Firewall/NAT
Misconfiguration risks	Even if apps are misconfigured, they aren’t externally accessible
Malware command & control access	Outbound control via NAT Gateway allows logging and control



2. Required Configuration Changes
Key configuration changes when disabling Public IPs:
Component	Required Change
Cluster Configuration	Select No Public IP during cluster creation (via UI or API)
VNet	VNet Injection is mandatory (i.e., use a custom VNet)
NAT Gateway	Required for outbound internet access (replaces Public IPs)
Route Table	Configure appropriate routes to direct traffic through NAT Gateway
NSG (Network Security Group)	Apply NSGs to private subnets to restrict access (e.g., by ports or IP ranges)
Private Link (Optional)	Use Private Endpoints for Workspace, DBFS, REST APIs, etc. (recommended)


Cost Impact (Regarding NAT Gateway)
Considerations on cost:
Item	Description
NAT Gateway Deployment	When No Public IP is selected, a NAT Gateway is required for outbound traffic (e.g., installing packages via PyPI or apt).
Reuse Existing NAT Gateway?	Yes, you can reuse an existing NAT Gateway within the same VNet and region.
Additional Costs	Creating a new NAT Gateway may cost around ¥3,000/month (fixed) plus traffic-based charges.
Savings on Public IPs	Disabling per-cluster Public IPs (which incur charges) can offset NAT Gateway costs, possibly leading to cost savings.
☑ If you already have a NAT Gateway in place, additional costs are minimal.
☑ For large volumes of traffic, NAT Gateway is more scalable and secure than public IPs.


 ++++++++++++++++++++++++++++++++++++++++++++++++++


 ✅ 1. How Restricting IP Access Enhances Security
🔐 Security Improvements by Restricting Workspace IP Access:
Limits access to trusted IP ranges only:
By defining allowed IP ranges (such as corporate VPN or specific office IPs), you prevent unauthorized users from even reaching the login page of the Databricks workspace.

Mitigates external threats:
IP restriction acts as a first line of defense against:

Brute-force login attempts

Unauthorized access from unknown networks

Exploitation of misconfigured permissions

Supports compliance requirements:
Many security frameworks (e.g., CIS, NIST, ISO 27001, SOC 2) recommend or mandate IP allowlisting for administrative interfaces.

Protects against session hijacking:
Restricting sessions to specific IP ranges limits the risk of compromised access tokens being reused from untrusted networks.

🛠️ 2. Required Configuration Changes
Step-by-step Overview:
Component	Required Changes
Azure Databricks Workspace	Use "Access Control Lists" or "IP Access Lists" to define allowed CIDR blocks via Azure CLI or REST API.
Each entry includes a label, CIDR range, and priority.

You can allow specific IPs (e.g., 203.0.113.5/32) or ranges (e.g., 203.0.113.0/24). | | Workspace Admin Configuration | You need "Azure Databricks Admin" privileges to set IP access lists. | | Fallback IPs (optional) | You can define fallback access for specific admin IPs to avoid lockouts. | | VNet / NAT Gateway (if Public IP is disabled) | If you're restricting workspace access and also disabling public IPs for clusters, ensure that:

NAT Gateway routes outbound traffic

Private endpoints or VNet peering is configured for internal access |

Example IP access list command:
bash
コピーする
編集する
databricks workspace-conf set-status --json '{
  "enableIpAccessLists": true
}'
databricks ip-access-list create --json '{
  "label": "AllowCorpVPN",
  "list_type": "ALLOW",
  "ip_addresses": ["203.0.113.0/24"],
  "enabled": true
}'
💰 3. Cost Impact (NAT Gateway Considerations)
Important Notes:
Item	Description
IP restrictions themselves	No additional cost — applying IP access rules on the workspace is a free security feature in Azure Databricks.
NAT Gateway	Only needed if you're disabling public IPs for the clusters (not related to workspace IP restriction directly).
Reusing Existing NAT Gateway	✅ Yes, you can reuse existing NAT Gateway for outbound traffic from multiple subnets or clusters.
NAT Gateway supports up to 50,000 concurrent flows, making it suitable for shared usage.	
New NAT Gateway Cost (if required)	~¥3,000/month + bandwidth costs — but may be offset by reducing Public IPs used on VMs or clusters.
🎯 Recommendation Summary
Perspective	Recommendation
Security	✅ Strongly recommended to restrict IP access to trusted networks. Drastically reduces exposure and aligns with compliance standards.
Configuration	🛠 Easy to configure using Azure CLI or Databricks REST API. Supports allow/block lists and admin fallbacks.
Cost	💡 No cost for the IP restriction feature itself. NAT Gateway cost only applies if you're combining this with private networking. Reuse existing NAT Gateway if possible.
 

    
管理者ユーザーが Community Site にログインして、Community 上のレコード詳細ページからカスタムリンクをクリックした場合でも、Visualforce ページを正常に開ける理由は以下の通りです：

管理者ユーザーが Community 上でリンクを開ける理由：
1. 管理者はすべてのアクセス権限を持っているから
管理者プロファイルには、該当の Visualforce ページや Apex クラスに対してすべてのアクセス権がデフォルトで付与されています。
→ Community のコンテキストであっても制限を受けません。

2. 管理者はサイトのルーティング制限を無視できる
たとえ URL に /apex/DS_customerCopyPDF のような直接リンクを使っていたとしても、管理者は Salesforce 全体のリソースにアクセスできるため、ルーティングの制限をバイパスできます。

3. Visualforce ページが正しく登録されていなくても開ける場合がある
Community ユーザーには Site の Guest User Profile または Login User Profile に明示的に Visualforce ページのアクセス権を与える必要がありますが、管理者はその制約を受けません。

逆に、Community User が開けないのはなぜ？
Visualforce ページが「Experience Builder site 向け」に有効化されていない
ユーザーのプロファイルにそのページのアクセス権がない
/apex/DS_customerCopyPDF のようなパスが Community サイトでは無効（正しくは $Site.BaseUrl + "/apex/..." を使うべき）



Microsoft Defender for Cloud’s DevOps Security enables early detection and remediation of security issues during the development lifecycle. Here's what it can do:

1. Security Analysis for Code and Infrastructure
Scans Infrastructure as Code (IaC) templates (ARM, Bicep, Terraform), Kubernetes manifests, and GitHub Actions for misconfigurations and vulnerabilities.

Identifies potential security issues early in the development process.

2. CI/CD Pipeline Security Monitoring
Integrates with GitHub and Azure DevOps to automatically scan pull requests and CI/CD pipelines.

Detects policy violations and notifies the relevant stakeholders.

3. Risk-Based Visibility
Prioritizes security findings based on severity and potential impact.

Provides centralized dashboards to view and manage DevOps security posture.

4. Security Policy Management
Enforces security policies aligned with organizational standards and compliance requirements.

Allows customization of policies for different environments or projects.


What Are the Benefits
1. Early Detection = Cost Savings
Security issues are detected before deployment, reducing the cost and effort required for fixes.

2. Centralized Security Visibility
Provides a unified view across multiple DevOps environments and repositories (GitHub, Azure DevOps, etc.).

3. Security Without Slowing Development
Integrates seamlessly into developers' workflows (e.g., PR scanning, inline GitHub feedback).

Enables a “shift left” approach without disrupting CI/CD pipelines.

4. Simplified Compliance
Helps enforce and monitor compliance with standards like CIS, NIST, etc.

Easily generate audit-friendly security insights.


  Implementation Steps (High-Level)
Prerequisites
An active Azure subscription with Microsoft Defender for Cloud enabled.

GitHub or Azure DevOps account with administrative permissions.

Steps
Go to Defender for Cloud in Azure Portal

Azure Portal > Microsoft Defender for Cloud

Navigate to “Environment Settings”

Go to “DevOps Security” > “Add Connection”

Connect to Your GitHub or Azure DevOps Repositories

For GitHub: Connect using GitHub App (OAuth flow)

For Azure DevOps: Create a service connection

Enable Scanning on Target Projects/Repos

Choose which projects or repos you want to monitor

Enable scans for IaC, Kubernetes manifests, and workflows

Monitor via Dashboard

Use Defender dashboards and alerts to track findings in real-time

Estimated Cost
Typical Pricing Model (as of April 2025):
Repository Scanning (GitHub/Azure DevOps):
~$10 USD per repo/month
(Note: Some free tier limits or trial periods may apply)

Advanced Features (IaC scan, SCA, etc.):
Cost may increase based on usage and volume of scans.

Free Tier:

Some basic scans and visibility features are included for free.

Good for small-scale testing or limited usage.





  
{!URLFOR($Page.DS_customerCopyPDF, null, [id=DirectlyOrder__c.Id, type='ds'])}



javascript:window.open(
  "{!$Site.BaseUrl}/dsportal/apex/DS_customerCopyPDF?id={!Id}&type=ds",
  "_blank"
);
javascript:window.open('{!$Site.BaseUrl}/apex/DS_customerCopyPDF?id={!Id}&type=ds','_blank');




HYPERLINK(
  "https://eponogolf--devgolf5.sandbox.my.site.com/s/dsportal/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
  "注文書 PDF",
  "_blank"
)


IF(
  $Profile.UserType = "Standard",
  /* 内部用户 */
  HYPERLINK(
    "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  ),
  /* Community User */
  HYPERLINK(
    $Site.Domain & $Site.Prefix & "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  )
)


IF(
  $Profile.UserType = "Standard",
  /* 内部用户 */
  HYPERLINK(
    "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  ),
  /* Community User */
  HYPERLINK(
    $Site.SiteUrlPrefix & "/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  )
)



1
IF(
  $Profile.UserType = "Standard",
  /* 内部用户 */
  HYPERLINK(
    "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  ),
  /* Community User */
  HYPERLINK(
    "/sfsites/c/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  )
)

2
IF(
  $Profile.UserType = "Standard",
  /* 内部用户 */
  HYPERLINK(
    "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  ),
  /* Community User */
  HYPERLINK(
    $Site.BaseUrl & "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  )
)









IF(
  $Profile.UserType = "Standard",
  /* 内部用户 */
  HYPERLINK(
    "/apex/DS_customerCopyPDF?id=" & Id,
    "注文書 PDF",
    "_blank"
  ),
  /* Community User */
  HYPERLINK(
    SUBSTITUTE($Site.BaseUrl, "/s", "") & "/apex/DS_customerCopyPDF?id=" & Id,
    "注文書 PDF",
    "_blank"
  )
)


IF(
  $Profile.UserType = "Standard",
  /* 内部用户的链接 */
  HYPERLINK(
    "https://" & $Api.Partner_Server_URL_370 & "/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  ),
  /* Community 用户的链接 */
  HYPERLINK(
    "https://epongolf--devgolf5.sandbox.my.site.com/s/dsportal/apex/DS_customerCopyPDF?id=" & Id & "&type=ds",
    "注文書 PDF",
    "_blank"
  )
)


<apex:page showHeader="false" sidebar="false">
    <apex:form >
        <!-- モーダル背景 -->
        <apex:outputPanel id="modalPanel" layout="block" styleClass="modal-overlay" rendered="{!showModal}">
            
            <!-- モーダル本体 -->
            <div class="modal-content">
                <!-- ✕ ボタン -->
                <span class="close-button" onclick="closeModal()">×</span>
                
                <h3>モーダル画面</h3>
                <p>ここに内容を表示</p>
            </div>
        </apex:outputPanel>

        <!-- モーダルを開くボタン -->
        <apex:commandButton value="モーダルを開く" action="{!openModal}" rerender="modalPanel" />

        <script>
            function closeModal() {
                // Apex コントローラの showModal を false にして再レンダリング
                document.querySelector('[name$="closeModalButton"]').click();
            }
        </script>

        <!-- Apex:commandButton で裏側でコントローラ変数更新用 -->
        <apex:commandButton id="closeModalButton" action="{!closeModal}" style="display:none" rerender="modalPanel"/>
    </apex:form>

    <style>
        .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        }
        .modal-content {
            position: relative;
            margin: 10% auto;
            padding: 20px;
            background: white;
            width: 50%;
            border-radius: 8px;
        }
        .close-button {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            color: #888;
        }
        .close-button:hover {
            color: #000;
        }
    </style>
</apex:page>




{!REQUIRESCRIPT("/soap/ajax/51.0/connection.js")}
{!REQUIRESCRIPT("/soap/ajax/51.0/apex.js")}

// 現在の環境に基づいてベースURLを決定する改良版
var currentUrl = window.location.href;
var baseUrl = '';

// コミュニティURLの検出（より信頼性の高い方法）
if (currentUrl.indexOf('/s/') >= 0) {
    // Experience Builder（コミュニティ）環境
    var communityUrlParts = currentUrl.split('/s/');
    if (communityUrlParts.length > 0) {
        baseUrl = communityUrlParts[0]; // コミュニティのベースURL
    }
} else if (currentUrl.indexOf('lightning.force.com') >= 0) {
    // Lightning Experience
    baseUrl = '';
} else if (currentUrl.indexOf('visualforce.com') >= 0) {
    // Visualforce内
    baseUrl = '';
} else {
    // 標準Salesforceまたはその他の環境
    baseUrl = '';
}

// VFページへのURLを構築（コミュニティの場合はサイトプレフィックスを使用）
var reportUrl = '';
if (baseUrl) {
    // コミュニティの場合は検出したベースURLを使用
    reportUrl = baseUrl + '/apex/帳票ページ名';
} else {
    // 標準Salesforceの場合はサイトプレフィックスを使用
    reportUrl = '{!$Site.Prefix}/apex/帳票ページ名';
}

// パラメータを付加
var fullUrl = reportUrl + '?id={!Order.Id}&source=' + (baseUrl ? 'community' : 'standard');

// デバッグ情報（問題があれば開発時にコンソールで確認できるよう）
console.log('検出環境: ' + (baseUrl ? 'コミュニティ' : '標準Salesforce'));
console.log('構築URL: ' + fullUrl);

// 新しいウィンドウで開く
try {
    window.open(fullUrl, '_blank');
} catch (e) {
    console.error('ウィンドウを開く際にエラーが発生しました: ', e);
    alert('帳票を開くことができませんでした。ポップアップがブロックされていないか確認してください。');
}



{!REQUIRESCRIPT("/soap/ajax/51.0/connection.js")}
{!REQUIRESCRIPT("/soap/ajax/51.0/apex.js")}

// 現在の環境に基づいてベースURLを設定
var currentUrl = window.location.href;
var baseUrl = '';

if (currentUrl.indexOf('lightning.force.com') >= 0) {
    // Lightning Experience
    baseUrl = '';
} else if (currentUrl.indexOf('visualforce.com') >= 0) {
    // Visualforce内
    baseUrl = '';
} else if (currentUrl.indexOf('.force.com/') >= 0 && currentUrl.indexOf('/s/') >= 0) {
    // コミュニティ環境
    baseUrl = '{!$Site.BaseUrl}';
} else {
    // 標準Salesforce
    baseUrl = '';
}

// VFページへのURLを構築
var reportUrl = baseUrl + '/apex/帳票ページ名';
var fullUrl = reportUrl + '?id={!Order.Id}&source=community';

// 新しいウィンドウで開く
window.open(fullUrl, '_blank');


Key Differences Between Azure Databricks Standard and Premium Tiers
Pricing Differentials

Base Pricing Structure:

Standard Tier: Approximately $0.40-$0.55 per DBU-hour
Premium Tier: Approximately $0.55-$0.75 per DBU-hour (approximately 25-40% higher)


Commitment-Based Discounts:

Both tiers offer commitment-based discount options
Premium tier typically provides more substantial enterprise-level discount opportunities


Minimum Commitment Requirements:

Premium tier generally requires higher minimum spend commitments
Standard tier offers a lower entry cost threshold


Total Cost of Ownership:

While Premium has higher hourly rates, its advanced features may deliver performance improvements that could potentially reduce overall computational costs in certain scenarios



Functional Differentiation

Security Capabilities:

Standard: Fundamental security features, including basic role-based access control and Azure AD integration
Premium: Enhanced security framework including Private Link support, customer-managed keys, full Unity Catalog support, and secure cluster connectivity


Networking Functionality:

Both tiers support VNet Injection (virtual network integration)
Premium offers more sophisticated network security controls and Private Link


Compute and Performance:

Standard: Basic autoscaling and job scheduling functionality
Premium: Advanced job scheduling, comprehensive Photon engine support, and enhanced auto-optimization


Data Governance:

Standard: Basic workspace management and audit logging
Premium: Comprehensive auditing capabilities, advanced cluster policies, and superior cost management tools


Machine Learning Capabilities:

Standard: Basic MLflow integration and limited automated ML
Premium: Complete feature store support, advanced model registry, and enhanced serving capabilities


Data Engineering:

Standard: Basic Delta Lake integration and ETL tooling
Premium: Advanced data pipelines, complete data lineage tracking, and enhanced streaming analytics


Service Level Agreements:

Standard: 99.95% availability assurance
Premium: 99.99% availability assurance


Support Levels:

Standard: Standard support package
Premium: Priority support services


Collaboration Features:

Standard: Basic notebook sharing and Git integration
Premium: Advanced dashboard sharing and team collaboration tools



In conclusion, the Standard tier is optimally positioned for teams and departments with moderate workloads and budget constraints, while the Premium tier is strategically designed for enterprise-scale deployments requiring advanced security, governance, and analytics capabilities. Selection between tiers should be based on a comprehensive assessment of specific business requirements, security needs, budgetary parameters, and anticipated scaling trajectories.


The main differences between Standard and Premium tiers regarding networking features are:

Premium tier offers additional advanced networking capabilities like:

Secure Cluster Connectivity
Private Link support
More advanced IP access controls
Enhanced network security features


Premium tier has better support for complex enterprise networking scenarios and more robust security implementations

But for the core VNet Injection functionality itself - the ability to deploy Databricks in your own VNet - this is available in both Standard and Premium tiers.

◼ Rationale for Each Recommendation

1. Disable Public IP for Clusters

Azure Databricks does not allow modifying IP settings after workspace creation.

Clusters with Public IPs are potentially exposed to brute-force attacks or unauthorized internet access.

Deploying a new workspace with VNet Injection and no Public IP ensures compute nodes remain isolated within a secure network boundary.

2. Use Private Link for Workspaces

Control plane traffic (UI, REST API) currently routes through the public internet.

Using Azure Private Link limits access to Microsoft’s private backbone network.

This helps prevent man-in-the-middle attacks, data interception, or spoofing and supports strict compliance requirements.

3. Disable Public Network Access

If public network access remains enabled, endpoints are discoverable from the internet.

Even with Private Link, failing to disable public access can leave an unnecessary attack surface.

Disabling public network access ensures full traffic isolation and enforces private-only connectivity.

◼ Implementation Procedure

Build a new workspace with VNet Injection + Private Link enabled

Migrate clusters, jobs, and notebooks to the new workspace

Configure Private DNS zones and routing

Disable public network access for the new workspace

Decommission legacy workspace

◼ Cost Comparison Before and After

Item

Before

After

Notes

Databricks Workspace

Standard SKU (Public Access)

Premium SKU + Private Link

Monthly cost increase of several thousand yen

Network / Private Endpoints

Not Required

Private Endpoints x 2–3

Additional cost for Private Link + DNS zone setup

Operational Overhead

Minimal

Initial setup required

Includes testing, migration, and training


◼ Overview and Key Items

This document outlines the proposed actions and rationale for addressing the following three VAPT (Vulnerability Assessment and Penetration Testing) recommendations:

Disable Public IP for ClustersPrevent direct internet exposure of compute nodes.

Use Private Link for WorkspacesEnsure secure, private connectivity to Azure services.

Disable Public Network Access to WorkspacesEliminate risks of unauthorized access over public networks.

◼ Executive Summary

Item

Current Status

Action Plan

Rationale

1. Clusters should disable Public IP

Not Implemented

Deploy new workspace with VNet Injection + No Public IP

Existing workspaces do not allow configuration changes; prevents third-party access

2. Workspaces should use Private Link

Not Implemented

Build new workspace with Private Link enabled

Reduces risk by avoiding public control-plane exposure

3. Workspaces should disable Public Network Access

Not Implemented

Disable public network access after Private Link setup

Prevents unauthorized access from public internet

◼ Details of Action Plan

1. Disable Public IP for Clusters

Current clusters are assigned Public IP addresses

Databricks does not support retroactive IP configuration changes

Create a new workspace with VNet Injection and disabled Public IP

Migrate existing cluster templates, jobs, and notebooks accordingly

2. Use Private Link for Workspace

Current workspace access (UI/API) is exposed to public networks

Use Azure Private Link to limit access to private Azure backbone

Configure Private DNS zones for internal name resolution

Gradually migrate resources to a Private Link-enabled new workspace

3. Disable Public Network Access

Workspaces currently accessible via public endpoints

Can be disabled via Azure Portal or CLI once Private Link is verified

Ensures all access paths are securely contained

◼ Implementation Procedure

Build a new workspace with VNet Injection + Private Link enabled

Migrate clusters, jobs, and notebooks to the new workspace

Configure Private DNS zones and routing

Disable public network access for the new workspace

Decommission legacy workspace

◼ Cost Comparison Before and After

Item

Before

After

Notes

Databricks Workspace

Standard SKU (Public Access)

Premium SKU + Private Link

Monthly cost increase of several thousand yen

Network / Private Endpoints

Not Required

Private Endpoints x 2–3

Additional cost for Private Link + DNS zone setup

Operational Overhead

Minimal

Initial setup required

Includes testing, migration, and training

◼ Expected Outcomes

All access to Azure Databricks is secured via private networking

Eliminates risk of unauthorized public access

Meets compliance standards for industries such as finance, manufacturing, and government

    

<apex:page controller="QuoteCopyController" sidebar="false" showHeader="true">
    <apex:form id="mainForm">

        <!-- ✅ 当前的見積明細（編集可能） -->
        <apex:pageBlock title="現在の見積明細" id="quoteDetailsBlock">
            <apex:pageBlockTable value="{!currentQuoteDetails}" var="qd">
                <apex:column value="{!qd.Name}" headerValue="項目名" />
                <apex:column headerValue="説明">
                    <apex:inputText value="{!qd.Description__c}" />
                </apex:column>
                <apex:column headerValue="数量">
                    <apex:inputText value="{!qd.Quantity__c}" />
                </apex:column>
            </apex:pageBlockTable>
        </apex:pageBlock>

        <!-- ✅ モーダルボタン -->
        <apex:commandButton value="他の見積からコピー" onclick="openModal(); return false;" styleClass="btn" />

        <!-- ✅ モーダルダイアログ -->
        <div id="copyModal" style="display:none; position:fixed; top:10%; left:10%; width:80%; height:80%; background:#fff; border:1px solid #ccc; padding:20px; z-index:9999; overflow:auto;">
            <h3>他の見積を検索</h3>

            <!-- ✅ 検索条件 -->
            <label>取引先名:</label>
            <apex:inputText value="{!searchAccountName}" />
            <br/>
            <label>商談名:</label>
            <apex:inputText value="{!searchOpportunityName}" />
            <br/>
            <label>Owner ID:</label>
            <apex:inputText value="{!searchOwnerId}" />
            <br/>
            <apex:commandButton value="検索" action="{!searchQuotes}" rerender="quoteResults" styleClass="btn" />

            <!-- ✅ 見積検索結果 -->
            <apex:outputPanel id="quoteResults">
                <apex:pageBlock title="検索結果: 見積">
                    <apex:pageBlockTable value="{!searchQuoteWrappers}" var="q">
                        <apex:column headerValue="選択">
                            <apex:inputCheckbox value="{!q.selected}" />
                        </apex:column>
                        <apex:column value="{!q.quote.Name}" headerValue="見積名" />
                        <apex:column value="{!q.quote.Account.Name}" headerValue="取引先" />
                        <apex:column value="{!q.quote.Opportunity.Name}" headerValue="商談" />
                    </apex:pageBlockTable>
                    <apex:commandButton value="見積明細を表示" action="{!loadQuoteDetailsFromSelection}" rerender="detailResults" styleClass="btn" />
                </apex:pageBlock>
            </apex:outputPanel>

            <!-- ✅ 見積明細表示部 -->
            <apex:outputPanel id="detailResults">
                <apex:pageBlock title="見積明細選択">
                    <apex:pageBlockTable value="{!searchDetailWrappers}" var="d">
                        <apex:column headerValue="選択">
                            <apex:inputCheckbox value="{!d.selected}" />
                        </apex:column>
                        <apex:column value="{!d.detail.Name}" headerValue="項目名" />
                        <apex:column value="{!d.detail.Description__c}" headerValue="説明" />
                        <apex:column value="{!d.detail.Quantity__c}" headerValue="数量" />
                    </apex:pageBlockTable>
                </apex:pageBlock>
            </apex:outputPanel>

            <apex:commandButton value="コピー" action="{!copySelectedDetails}" rerender="quoteDetailsBlock" oncomplete="closeModal();" styleClass="btn" />
            <input type="button" value="閉じる" onclick="closeModal();" class="btn" />
        </div>
    </apex:form>

    <!-- ✅ JS -->
    <script>
        function openModal() {
            document.getElementById('copyModal').style.display = 'block';
        }
        function closeModal() {
            document.getElementById('copyModal').style.display = 'none';
        }
    </script>

    <style>
        .btn {
            background-color: #0070d2;
            color: white;
            padding: 6px 12px;
            margin: 6px;
            border: none;
            border-radius: 4px;
        }
    </style>
</apex:page>


public class QuoteCopyController {

    public List<QuoteDetail__c> currentQuoteDetails { get; set; }
    public String searchAccountName { get; set; }
    public String searchOpportunityName { get; set; }
    public String searchOwnerId { get; set; }

    public List<QuoteWrapper> searchQuoteWrappers { get; set; }
    public List<QuoteDetailWrapper> searchDetailWrappers { get; set; }

    public QuoteCopyController() {
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        currentQuoteDetails = [SELECT Name, Description__c, Quantity__c FROM QuoteDetail__c WHERE Quote__c = :quoteId];
    }

    public void searchQuotes() {
        String query = 'SELECT Id, Name, Account.Name, Opportunity.Name FROM Quote WHERE Name != null';
        if (String.isNotBlank(searchAccountName)) {
            query += ' AND Account.Name LIKE \'%' + String.escapeSingleQuotes(searchAccountName) + '%\'';
        }
        if (String.isNotBlank(searchOpportunityName)) {
            query += ' AND Opportunity.Name LIKE \'%' + String.escapeSingleQuotes(searchOpportunityName) + '%\'';
        }
        if (String.isNotBlank(searchOwnerId)) {
            query += ' AND OwnerId = \'' + String.escapeSingleQuotes(searchOwnerId) + '\'';
        }

        List<Quote> result = Database.query(query);
        if (result.size() > 50) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '検索結果が50件を超えました。絞り込んでください。'));
            return;
        }

        searchQuoteWrappers = new List<QuoteWrapper>();
        for (Quote q : result) {
            searchQuoteWrappers.add(new QuoteWrapper(q));
        }
    }

    public void loadQuoteDetailsFromSelection() {
        Set<Id> selectedQuoteIds = new Set<Id>();
        for (QuoteWrapper wrap : searchQuoteWrappers) {
            if (wrap.selected) {
                selectedQuoteIds.add(wrap.quote.Id);
            }
        }

        searchDetailWrappers = new List<QuoteDetailWrapper>();
        if (!selectedQuoteIds.isEmpty()) {
            List<QuoteDetail__c> details = [
                SELECT Id, Name, Description__c, Quantity__c, Quote__c
                FROM QuoteDetail__c
                WHERE Quote__c IN :selectedQuoteIds
            ];
            for (QuoteDetail__c d : details) {
                searchDetailWrappers.add(new QuoteDetailWrapper(d));
            }
        }
    }

    public void copySelectedDetails() {
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        List<QuoteDetail__c> toInsert = new List<QuoteDetail__c>();
        for (QuoteDetailWrapper wrap : searchDetailWrappers) {
            if (wrap.selected) {
                QuoteDetail__c copy = wrap.detail.clone(false, false, false, false);
                copy.Quote__c = quoteId;
                toInsert.add(copy);
            }
        }
        if (!toInsert.isEmpty()) {
            insert toInsert;
        }

        // 再取得
        currentQuoteDetails = [SELECT Name, Description__c, Quantity__c FROM QuoteDetail__c WHERE Quote__c = :quoteId];
    }

    public class QuoteWrapper {
        public Quote quote { get; set; }
        public Boolean selected { get; set; }
        public QuoteWrapper(Quote q) {
            this.quote = q;
            this.selected = false;
        }
    }

    public class QuoteDetailWrapper {
        public QuoteDetail__c detail { get; set; }
        public Boolean selected { get; set; }
        public QuoteDetailWrapper(QuoteDetail__c d) {
            this.detail = d;
            this.selected = false;
        }
    }
}





```
az keyvault show --name <KeyVault名> --resource-group <リソースグループ名> --query properties.softDeleteRetentionInDays
```

    function afterClose() {
    if (dto.fClose) {
        var openStandardPage = "[{!$Resource.SR_HTML_OpenStandardPage}" + 
            "?openURL=" + encodeURIComponent("/{!dto.mitsumori.Id}");

        window.open(openStandardPage, '', 'width=0px, height=0px');

        // 确保母页面存在并且没有关闭
        if (window.opener && !window.opener.closed) {
            try {
                // 如果是 Lightning 页面，使用 Lightning API 刷新
                if (window.opener.$A) {
                    window.opener.$A.get('e.force:refreshView').fire();
                } else {
                    // Classic 页面使用 location.reload()
                    window.opener.location.reload();
                }
            } catch (e) {
                console.error("无法刷新母页面", e);
            }
        }

        // 关闭当前窗口
        setTimeout(function() {
            window.close();
        }, 500);
    }
}

```
function afterClose() {
    if (dto.fClose) {
        var openStandardPage = "[{!$Resource.SR_HTML_OpenStandardPage}" + 
            "?openURL=" + encodeURIComponent("/{!dto.mitsumori.Id}");

        window.open(openStandardPage, '', 'width=0px, height=0px');
        
        // 刷新母页面
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }

        // 关闭当前窗口
        window.close();
    }
}

````




public void moveFeedItemWithFiles(Id oldFeedItemId, Id newParentId) {
    // 1. 元の投稿（FeedItem）を取得
    FeedItem oldFeed = [SELECT Id, Body, Title FROM FeedItem WHERE Id = :oldFeedItemId];

    // 2. 新しい投稿を作成（ParentIdを変更）
    FeedItem newFeed = new FeedItem();
    newFeed.ParentId = newParentId;
    newFeed.Body = oldFeed.Body;
    newFeed.Title = oldFeed.Title;
    newFeed.Type = 'ContentPost'; // ファイル投稿
    insert newFeed;
    
    // 3. 旧投稿に添付されたファイルを取得
    List<ContentDocumentLink> oldLinks = [
        SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :oldFeedItemId
    ];

    // 4. 新しい投稿にファイルを紐づける
    List<ContentDocumentLink> newLinks = new List<ContentDocumentLink>();
    for (ContentDocumentLink link : oldLinks) {
        ContentDocumentLink newLink = new ContentDocumentLink();
        newLink.LinkedEntityId = newFeed.Id; // 新しい投稿に紐づける
        newLink.ContentDocumentId = link.ContentDocumentId;
        newLink.ShareType = 'V'; // Viewerとして設定
        newLinks.add(newLink);
    }
    insert newLinks;

    // 5. 元の投稿を削除（オプション）
    delete oldFeed;
}


NOT(
    REGEX(YearMonth__c, "^(19|20)\\d{2}(0[1-9]|1[0-2])$")
)
「YYYYMM形式（例：202403）で入力してください。」



Chatter の通知に関しては、メール通知とアプリケーション内通知（ベル通知）の設定が密接に関連しています。メール通知を無効にすると、ベル通知も受信できなくなる場合があります。詳細は上記の公式ドキュメントをご参照ください。


If your network security requirements primarily involve IP and port-level access control, NSG is sufficient.
If you require advanced threat detection (malicious traffic blocking) and application-layer filtering (website access control), Azure Firewall is the better choice.



Why Azure Virtual Network with NSG Makes Azure Firewall Unnecessary
In an Azure Virtual Network, Network Security Groups (NSG) can be used to control inbound and outbound traffic at both the subnet and network interface levels. This often makes Azure Firewall unnecessary for the following reasons:

Granular Traffic Control

NSGs allow for fine-grained control over network traffic by defining rules based on source/destination IP, port, and protocol.
They effectively restrict or allow traffic, ensuring only authorized communication between resources.
Cost Efficiency

NSGs are free and do not incur additional costs, whereas Azure Firewall is a paid service that charges based on usage and deployment.
Organizations looking to reduce expenses can achieve similar security without deploying Azure Firewall.
Low Latency & Performance Optimization

NSGs operate at the network level, making them highly efficient in processing traffic without introducing additional latency.
Azure Firewall, on the other hand, is a stateful firewall that may slightly impact performance due to deep packet inspection and rule processing.
Integration with Other Azure Security Services

NSGs work seamlessly with Azure Private Link, Application Gateway, and VPN Gateways, allowing for robust security policies without requiring an additional firewall layer.
Simplicity & Ease of Management

NSGs are simpler to configure and manage compared to Azure Firewall, which requires additional rules for both inbound and outbound traffic filtering.
For small to medium-sized networks, NSGs alone are often sufficient to meet security requirements.
When Azure Firewall is Still Needed
However, NSGs have some limitations. If you need features such as threat intelligence, full Layer 7 (application-level) filtering, or centralized logging and auditing, Azure Firewall may still be necessary.

Conclusion
If your security requirements are primarily network-level traffic control and you do not need advanced threat protection, NSGs can effectively replace Azure Firewall, leading to lower costs, improved performance, and simpler management.
