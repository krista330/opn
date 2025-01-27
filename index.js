To describe this in PowerPoint in English, you can use the following:
	1.	Slide Title: “Inherited Permissions Issue”
	2.	Description:
	•	“The two ‘unknown’ identities listed in the Access Control (IAM) section are contributors whose permissions are inherited from the subscription level.”
	•	“These errors indicate that the identities are not found and may result in issues across all resources under this subscription.”
	3.	Additional Notes:
	•	“It is unclear whether this error impacts all resources. Further investigation is required to determine the scope of the issue and identify the missing identities.”

This format can help communicate the issue clearly and professionally in your presentation. If you want further customization or diagrams, let me know!


Error Message in the Image:

The error message in the screenshot states:
“Identity not found. Unable to find identity.”

Possible Cause:

This error occurs when a listed identity (e.g., App, User, or Service Principal) in the Access Control (IAM) for the resource no longer exists or cannot be resolved. Common reasons include:
	1.	The identity was deleted from Azure Active Directory or removed from the subscription.
	2.	There are sync or metadata issues between Azure AD and the resource.

Recommended Resolution:
	1.	Audit and Review:
	•	Identify the purpose of the unknown identity in the Access Control (IAM) list.
	•	Review Azure AD logs to check if the identity was deleted or renamed.
	•	Use the Activity Log in Azure to check if this identity was actively being used.
	2.	Remove the Orphaned Identity:
	•	If the identity is no longer valid or needed, remove it from the Access Control (IAM) to clean up the permissions.
	3.	Restore Identity:
	•	If the identity was accidentally deleted or is still required, restore it in Azure AD (if possible).
	•	Alternatively, create a new identity and assign the required roles.
	4.	Contact Support (if necessary):
	•	If the identity is critical and no information is available, contact Azure support for assistance in identifying the issue.

Risks of Not Resolving the Issue:
	1.	Security Risk: The resource may have unresolved or unnecessary permissions assigned to non-existent identities, leading to potential misuse if identities are incorrectly re-added.
	2.	Operational Issues: If the identity is still required for a legitimate purpose, services relying on this identity could fail.
	3.	Compliance Risk: An untracked or unresolvable identity may lead to non-compliance with organizational or regulatory requirements.

Recommended Approach:
	1.	Prioritize investigating the unknown identity to confirm whether it is critical or obsolete.
	2.	Remove the identity promptly if it is not required.
	3.	Regularly audit and update IAM permissions to ensure all roles and identities are accurate.



「Export and Import」方法に分類される移行ツールとして、主に BACPAC ファイルを使用してデータベースを移行するためのツールがあります。
  この方法は、データベースのスキーマとデータを含むファイルをエクスポートして移行先でインポートするプロセスです。以下に代表的なツールをご紹介します。

ツール比較表
ツール	操作性	適用シナリオ	主な特徴
SSMS	GUI中心	小～中規模データベース	無料で簡単に操作可能
Azure Portal	GUI中心	Azure 環境内の移行	Azure Blob Storage を利用可能
SQLPackage CLI	コマンドライン	自動化や大規模データ移行	スクリプトによる柔軟な管理が可能
Azure Data Studio	GUI+スクリプト	複数プラットフォームでの管理	拡張機能が豊富で開発者向け
結論
簡単さを重視する場合：SSMS または Azure Portal を選択。
自動化や柔軟性を重視する場合：SQLPackage CLI を使用。
開発者向けの機能を活用したい場合：Azure Data Studio が適しています。



Azure SQL Database間の移行方法と移行ツールのご紹介
Azure SQL Database間の移行を実施する際、データ規模、移行の緊急性、および業務要件に応じて最適な方法とツールを選択する必要があります。以下に、移行の方法とツールをご紹介いたします。

移行方法
オンライン移行

データソースと移行先が同時にオンライン状態を保つ方法。
ダウンタイムを最小限に抑えることが可能。
データ規模が大きい場合やリアルタイムデータを重視するシナリオに最適。
オフライン移行

一定時間、データソースへのアクセスを停止する方法。
小規模なデータベースやダウンタイムが許容される場合に適している。
移行ツール
Azure Database Migration Service (DMS)

特徴：オンライン移行およびオフライン移行に対応。自動化された移行プロセスを提供し、スキーマ、データ、ロジックの移行をサポート。
適用シナリオ：データベースの規模が大きく、オンライン移行が必要な場合。
Data Migration Assistant (DMA)

特徴：移行前の評価ツールとして、問題点を事前に特定可能。スキーマとデータの移行に対応。
適用シナリオ：小規模データベースの移行や手動で移行プロセスを管理したい場合。
Export and Import

方法：データベースをBACPACファイル（スキーマとデータを含む）としてエクスポートし、移行先にインポートする。
適用シナリオ：中小規模データベースやダウンタイムが許容される場合。
Transactional Replication

特徴：トランザクションレベルで変更を移行先に適用するリアルタイム移行方法。停止時間を最小化。
適用シナリオ：データベースが継続的に書き込みを必要とし、長時間の停止が許されない場合。
Bulk Copy Program (BCP)

方法：BCPツールを使用してデータをエクスポートし、移行先にインポートする。
適用シナリオ：スキーマがすでに準備されており、データのみ移行する場合。
Azure Data Factory (ADF)

特徴：ビジュアルなデータパイプライン設計を提供し、複雑なデータ統合シナリオにも対応可能。
適用シナリオ：大規模データ移行や複雑なデータ統合要件がある場合。
SQL Server Management Studio (SSMS)を使用した移行
**SSMSを使用した移行は、「Export and Import」方法に分類されます。**具体的には、BACPACファイルを活用したオフライン移行を行います。

移行の流れ：

BACPACファイルのエクスポート（移行元データベース）：

SSMSで移行元Azure SQL Databaseに接続。
対象データベースを右クリックし、Tasks > Export Data-tier Applicationを選択。
ファイルの保存場所を指定（ローカルまたはAzure Blob Storage）。
BACPACファイルのインポート（移行先データベース）：

SSMSで移行先Azure SQL Serverに接続。
サーバー名を右クリックし、Deploy Data-tier Applicationを選択。
エクスポートしたBACPACファイルを指定し、インポートを完了。
利点：

簡単で直感的な操作が可能。
無料で利用可能。
スキーマとデータの一括移行が可能。
注意点：

オフライン移行のため、ダウンタイムが発生。
データベース規模が大きい場合、処理時間が長くなる可能性あり。
増分移行やリアルタイム同期は非対応。
結論： SSMSを使用した移行は、スキーマとデータを一括で移行できるシンプルな方法です。ただし、ダウンタイムが許容される場合に限ります。もし大規模データベースやリアルタイム同期が必要な場合は、Azure DMSやTransactional Replicationの使用を推奨いたします。

ビジネスシーンに適した内容となるようにご参考ください。
