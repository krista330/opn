「相続情報メール通知」処理失敗により、このレコードを保存できません。Salesforce システム管理者に次の詳細を報告してください。Probably Limit Exceeded or 0 recipients. Possible invalid email addresses: $Record.C_AccountId__r.Owner.Email エラー ID: 928899535-267720 (1731341359) invalid email addresses: $Record.C_AccountId__r.Owner.Email エラー ID: 928899535-267720 (1731341359)


1️⃣ The change is irreversible – Purge Protection cannot be disabled once activated.
2️⃣ Immediate permanent deletion is no longer possible, affecting test environments or automation scripts that rely on frequent key rotations.
3️⃣ Modifications to existing processes may be required to align with new deletion restrictions.

Potential Adjustments to DevOps & Automation – If existing workflows involve frequent deletion and recreation of Key Vaults, they may need modifications, as the same Key Vault name cannot be reused until the soft-delete retention period ends.

```
AzureのDBとApp Service Planのメトリックス定点チェック手順書

1. 手順書の目的

本手順書は、Azure上のデータベース（DB）とApp Service Planのメトリックスを定期的に監視し、適切なパフォーマンス管理を行うことを目的としています。具体的には、DTU、容量、リソースの使用状況などを確認し、異常値がないかをチェックすることで、サービスの安定運用をサポートします。

2. 実施頻度

このチェックは週に1回実施します。緊急時には随時実施し、必要に応じて対応を行います。

3. 定点チェックの推奨手順

データベース（DB）のメトリックス確認

DTU使用率と最大DTU値の確認（プランによる違いを明示）

使用容量と最大容量の確認

App Service Planのメトリックス確認

MOLITテナントとMOLテナントの切り替え（各テナントのURL明記）

CPU、メモリ、ディスク使用率の確認

複数の値の種類を同時に確認する方法

注意書きメッセージのスクリーンショット取得および対応手順の記録

記録シートの更新

取得したデータの期間を明記（例：2024年2月10日10時〜2024年2月17日10時）

別シートにあるグラフが適切に更新されているかの確認

4. データベース（DB）のメトリックス確認手順

4.1 DTUと容量の確認

Azureポータルにログインし、対象のデータベースを開き、メトリックスを確認します。

DTUの確認手順

Azureポータルにログイン

SQL Databaseのリソースを選択

[メトリック] タブを開く

DTU使用率（%） を確認

Basic / Standard / Premium プランでの違いを明示

使用率が80%以上の場合は担当者に報告

最大DTUの確認（プランによって異なる）

Basic: 5 DTU

Standard: 10〜3000 DTU

Premium: 125〜4000 DTU

スクリーンショットを取得し、記録シートに添付

容量の確認手順

SQL Databaseのリソースを開く

[概要] タブで現在の使用容量を確認

最大容量との比較

使用率が80%以上の場合はアラートを設定

スクリーンショットを取得し、記録シートに添付

5. App Service Planのメトリックス確認手順

5.1 MOLITテナントとMOLテナントの切り替え

MOLITテナントURL: https://portal.azure.com/MOLIT

MOLテナントURL: https://portal.azure.com/MOL

画面右上のアカウントアイコンからテナントを変更

5.2 確認するメトリックス

CPU使用率

メモリ使用率

ディスク使用率

ネットワークのスループット

5.3 複数のメトリックスを同時に確認する方法

App Service Planのリソースを開く

[メトリック] タブを開く

[追加] ボタンをクリックし、表示したいメトリックスを選択

表示形式をグラフまたはリストで調整

スクリーンショットを取得し、記録シートに添付

5.4 注意書きメッセージの対応

確認中に注意書きが表示された場合、スクリーンショットを取得

内容を確認し、必要に応じて対応手順を記録

対応が必要な場合は担当者へ報告

6. 記録シートの更新手順

取得データの期間を記録

例：2024年2月10日10時 〜 2024年2月17日10時

各メトリックスの値を記入

スクリーンショットを添付

別シートのグラフ更新を確認

更新されていない場合、データ範囲を見直し

7. まとめ

本手順書に従い、定期的にAzureのDBおよびApp Service Planのメトリックスをチェックすることで、安定したシステム運用が可能となります。異常値を検知した場合は、速やかに対応を行い、適切な報告を行ってください。
```
