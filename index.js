当行取引地位（Bank Transaction Status）
（取引状況を表す選択肢）

主要取引先
準主要取引先
一般取引先
取引なし
取引検討中
② 従業員数（Number of Employees）
（範囲で分類）

1～10人
11～50人
51～100人
101～500人
501～1000人
1001～5000人
5001人以上
③ 業種（Industry）
（主要業種分類）

製造業
卸売業
小売業
IT・通信
金融・保険
不動産
建設業
運輸・物流
飲食業
医療・福祉
教育・研究
公共・行政
その他
④ 業種（詳細）（Sub-Industry）
（業種ごとの詳細分類）
例：製造業の場合

自動車製造
電子部品製造
化学製品製造
食品製造
鉄鋼・金属製造
繊維・衣料品製造
例：IT・通信の場合

ソフトウェア開発
システムインテグレーター
クラウドサービス
通信キャリア
Webサービス
※ **業種（詳細）**は、業種（Industry）の選択に応じて動的に表示する「依存関係付き選択リスト（Dependent Picklist）」に設定すると便利。

⑤ 格付（直近）（Latest Credit Rating）
（金融機関の格付け基準に準拠）

AAA
AA+
AA
AA-
A+
A
A-
BBB+
BBB
BBB-
BB+
BB
BB-
B+
B
B-
CCC+ 以下
未評価


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
