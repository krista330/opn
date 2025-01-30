Security Risks of Enabling SCM and FTP Basic Authentication

1. Credential Vulnerability
	•	Basic authentication relies solely on username and password, making it susceptible to credential theft.
	•	If credentials are leaked, unauthorized users can gain full access to the application environment.

2. Susceptibility to Brute-Force Attacks
	•	Since there are no built-in protections against repeated failed login attempts, attackers can use automated scripts to guess passwords.
	•	Weak passwords significantly increase the risk of a successful breach.

3. Unencrypted Data Transmission (FTP Risk)
	•	FTP transmits credentials and data in plaintext, making it vulnerable to Man-in-the-Middle (MITM) attacks.
	•	Attackers on the same network can intercept login credentials and sensitive files.

4. Risk of Unauthorized Code Deployment (SCM Risk)
	•	If SCM authentication is compromised, attackers can deploy malicious code, modify existing applications, or even delete critical files.
	•	This can lead to service downtime, data corruption, or security breaches.

5. Compliance and Regulatory Issues
	•	Many security standards (ISO 27001, CIS Benchmarks, NIST, GDPR, HIPAA) recommend disabling basic authentication due to its security weaknesses.
	•	Organizations using basic authentication may fail security audits, leading to compliance violations and potential fines.

6. No Multi-Factor Authentication (MFA) Support
	•	Basic authentication does not support MFA, making it easier for attackers to access accounts with stolen credentials.
	•	Modern security best practices mandate the use of MFA to prevent unauthorized access.

Recommendations to Mitigate Risks

✅ Disable Basic Authentication for both SCM and FTP in Azure App Service settings.
✅ Use Secure Alternatives such as Azure AD authentication, OAuth, or SSH keys for secure access.
✅ Enable Multi-Factor Authentication (MFA) to add an extra layer of security.
✅ Restrict Access by IP Address to prevent unauthorized login attempts from unknown locations.
✅ Use Secure File Transfer Methods like FTPS, SFTP, or Azure Blob Storage instead of FTP.
✅ Monitor and Audit Access Logs to detect and respond to potential security incidents.

🔹 Action Required: To ensure security and compliance, it is strongly recommended to disable basic authentication immediately and implement secure authentication mechanisms.



Salesforce Financial Services Cloud（FSC）では、金融業界向けに特化したさまざまなオブジェクトと権限が提供されています。以下に、FSCで利用可能な主なオブジェクトと権限のリストをまとめます。

主なオブジェクト:

取引先（Account）
金融取引先（Financial Account）
世帯（Household）
リレーショングループ（Relationship Group）
取引先責任者（Contact）
商談（Opportunity）
活動（Activity）
ToDo
カレンダー
行動（Action）
コンテンツ（Content）
ドキュメント（Document）
金融取引先トランザクション（Financial Account Transaction）
ライフイベント（Life Event）
アラート/通知（Alert/Notification）
主なユーザー権限:

Chatter
プロセス & フローの作成
ワークフロー & 承認プロセスの作成
カスタム権限セット
レポートのカスタマイズ
ダッシュボードのカスタマイズ
ユーザーおよびプロファイルの管理
組織によるカスタムプロファイルおよびページレイアウトの許可
組織によるレコードタイプの許可
ロールアップサマリー
メール送信
Apexコードの作成
これらのオブジェクトや権限は、FSCの機能を最大限に活用するために重要な要素となります。詳細な情報や最新のリストについては、Salesforceの公式ドキュメントやヘルプページをご参照ください。


情報源





あなた:
上記以外に利用禁止ですか？利用したら費用発生しますか？
ChatGPT:
ChatGPT
Financial Services Cloud（FSC）では、特定のオブジェクトや権限の使用が制限されている場合があります。これらの制限を超えて追加の機能や制限の拡張を依頼する場合、Salesforceサポートによって取り扱われ、ほとんどの場合無料で利用できますが、特定の機能や制限の変更には期限が設けられていることがあります。 
HELP.SALESFORCE.COM

FSCの利用可能なオブジェクトや権限の詳細については、Salesforceの公式ドキュメントやサポートにお問い合わせいただくことをお勧めします。


情報源






あなた:
上面个两个问题的情报源请列出来
ChatGPT:
ChatGPT
Financial Services Cloud（FSC）における利用可能なオブジェクトや権限、ならびに利用制限や追加費用に関する情報源として、以下のリソースをご参照いただくことをお勧めします：

Salesforce Financial Services Cloud 概要： FSCで提供される主な機能やオブジェクトについて詳しく説明されています。

URL: https://help.salesforce.com/s/articleView?id=sf.financial_services_cloud.htm&type=5
Salesforce Financial Services Cloud 実装ガイド： FSCの設定やカスタマイズに関する詳細な手順が記載されています。

URL: https://help.salesforce.com/s/articleView?id=sf.financial_services_cloud_implementation_guide.htm&type=5
Salesforce Financial Services Cloud ライセンスと権限： FSCで利用可能な権限セットやライセンスに関する情報が提供されています。

URL: https://help.salesforce.com/s/articleView?id=sf.financial_services_cloud_licenses_permissions.htm&type=5
これらのリソースを参照することで、FSCにおける利用可能なオブジェクトや権限、ならびに利用制限や追加費用に関する詳細な情報を得ることができます。


情報源




■要件
・FSCとして利用可能と判断したオブジェクトに○をつける
・上記○をつけたオブジェクトが、Salesforce規約上のどれに該当すると判断したか、規約上の名称を記載する
・各列の判断基準を明記してください


■Salesforce規約
(1) 以下のオブジェクトの全機能を含みます: 取引先、活動、ToDo、カレンダー、行動、取引先責任者、コンテンツ、ドキュメント、商談、B2C および B2B データモデル、金融取引先、金融取引先トランザクション、世帯およびリレーショングループ、リレーションマップ、クライアントおよび世帯プロファイル、アラート/通知、Lightning フロー、ライフイベント。
(2) 以下のユーザ機能の全機能を含みます: オフライン、Lightning フロー自動化、ワークフロー & 承認。
(3) 以下のユーザ許可の全機能を含みます: Chatter、プロセス & フローの作成、ワークフロー & 承認プロセスの作成、カスタム権限セット、レポートのカスタマイズ、ダッシュボードのカスタマイズ、ユーザおよびプロファイルの管理、組織によるカスタムプロファイルおよびページレイアウトの許可、組織によるレコードタイプの許可、Rollup summaries、メール送信、Write Apex Code。
(4)以下のその他の機能の全機能を含みます: Salesforce モバイルアプリケーション、重複ブロック、個人取引先、フルオフラインモバイル機能、AppExchange。
(5)アクセスは以下に限定されます: 50カスタムアプリケーション、50カスタムタブ、60カスタムオブジェクト、20 MBデータストレージ、512 MBファイルストレージ、1000 API呼び出し/日。
(6) ここに記載されていない機能は全て禁止されます。​

■背景
FSCはユーザライセンス「Salesforce」を使うものとなっており、設定レベルでは一切制御されないものとなってます（いわゆる紳士協定）。
そのため、FSC向けライセンスでは規約上利用不可なオブジェクト、権限を設定できてしまいます。
が、設定してしまうと、定期的なSalesforce社のモニタリングにより引っかかってしまい、費用請求もしくは設定見直しが必要となってしまうため、上記のような事態（手戻り含む）を避けるため、要件定義時点で「FSCとして利用可能なオブジェクト/権限を明確化」しておく必要があります。




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


仕様の要約
取引先のRecord Type:
Business
Individual
商談のRecord Type:
(Individual) test01, test02, test03
(Business) test04, test05
要件:
Business取引先 → Business商談のみ作成可能。
Individual取引先 → Individual商談のみ作成可能。
実装案

案1: Validation Ruleを使用
概要
取引先のRecord Typeに応じて、商談作成時に選択可能なRecord TypeをValidation Ruleで制限します。
商談に関するValidation Rule例:
plaintext
コピーする
編集する
AND(
    NOT(ISPICKVAL($RecordType.Name, "test04")),
    NOT(ISPICKVAL($RecordType.Name, "test05")),
    Account.RecordType.DeveloperName = "Business"
)
上記例は、取引先がBusinessの場合、test04とtest05以外の商談Record Typeを選択するとエラーになる。
メリット
設定が簡単でコード不要。
管理画面から変更が容易。
デメリット
エラーメッセージが商談作成後に表示されるため、ユーザーエクスペリエンスがやや低下する可能性がある。
Record Type選択画面自体の選択肢を制御することはできない。

案2: Lightning Flowを使用
概要
商談作成時にScreen Flowを使用して、ユーザーが取引先のRecord Typeに応じた商談Record Typeだけを選択できる画面を提供します。
フローの構造:
商談作成のトリガーとなるボタンを取引先ページに追加。
Flow内でAccount.RecordType.DeveloperNameを取得。
条件に応じた選択肢（商談Record Type）を表示。
必要情報を入力後、商談を作成。
メリット
ユーザーエクスペリエンスが向上（誤った選択肢をそもそも非表示にできる）。
選択肢を制御するロジックが明確で保守性が高い。
デメリット
初期設定に時間がかかる（特にFlowに不慣れな場合）。
作成時に複数のフローを統合管理する必要がある。

案3: Apex Triggerを使用
概要
商談の挿入時（before insert）にTriggerを実装し、取引先のRecord Typeに応じて適切な商談Record Typeであることをチェック。
例:
apex
コピーする
編集する
trigger ValidateOpportunityRecordType on Opportunity (before insert) {
    Map<Id, Account> accountMap = new Map<Id, Account>(
        [SELECT Id, RecordType.DeveloperName FROM Account WHERE Id IN :Trigger.newMap.values().AccountId]
    );
    for (Opportunity opp : Trigger.new) {
        Account acc = accountMap.get(opp.AccountId);
        if (acc.RecordType.DeveloperName == 'Business' &&
            (opp.RecordType.DeveloperName != 'test04' && opp.RecordType.DeveloperName != 'test05')) {
            opp.addError('Business取引先にはBusiness商談レコードタイプのみ作成可能です。');
        } else if (acc.RecordType.DeveloperName == 'Individual' &&
            (opp.RecordType.DeveloperName != 'test01' && opp.RecordType.DeveloperName != 'test02' && opp.RecordType.DeveloperName != 'test03')) {
            opp.addError('Individual取引先にはIndividual商談レコードタイプのみ作成可能です。');
        }
    }
}
メリット
高度な制御が可能で、複雑なビジネスロジックにも対応できる。
処理が商談挿入前に行われるため、データの整合性が保たれる。
デメリット
コードメンテナンスが必要（変更時に開発リソースが必要）。
トリガーの処理が増えると、プラットフォーム制限（例: DML操作数制限）に注意が必要。

案4: 権限セットまたはプロファイルを使用
概要
ユーザーのプロファイルまたは権限セットを利用して、特定の商談Record Typeへのアクセスを制限します。
Business取引先を扱うユーザーは、Business商談Record Typeのみにアクセス可能。
Individual取引先を扱うユーザーは、Individual商談Record Typeのみにアクセス可能。
メリット
権限による制御なので設定が簡単。
ユーザーごとに異なる要件を設定可能。
デメリット
ユーザーが両方の取引先を扱う場合、制御が複雑化する。
権限管理が煩雑になる可能性がある。

比較表
実装案	メリット	デメリット
Validation Rule	簡単に設定可能。コード不要。	エラーメッセージが作成後に表示されるためUXが低下。
Lightning Flow	ユーザーエクスペリエンスが良い。選択肢を明確に制御可能。	初期設定が複雑で、Flowのメンテナンスが必要。
Apex Trigger	高度なロジックの実装が可能。データ整合性を確実に保つ。	開発リソースが必要。トリガー制限に注意が必要。
権限セット/プロファイル	設定が簡単。ユーザーごとに異なる要件を適用可能。	ユーザーが両方の取引先を扱う場合、制御が複雑化する。

おすすめの実装案
シンプルな要件の場合: Validation Rule。
開発リソースが少なく済み、簡単に実装可能。
ユーザー体験を重視する場合: Lightning Flow。
商談作成時に適切な選択肢のみを提示することで、ユーザーの操作ミスを防げる。
複雑な要件に対応する場合: Apex Trigger。
より高度なロジックが必要な場合に適している。
運用状況や開発リソースに応じて、最適な案を選択してください！
