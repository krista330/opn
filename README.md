「相続情報メール通知」処理失敗により、このレコードを保存できません。Salesforce システム管理者に次の詳細を報告してください。Probably Limit Exceeded or 0 recipients. Possible invalid email addresses: $Record.C_AccountId__r.Owner.Email エラー ID: 928899535-267720 (1731341359) invalid email addresses: $Record.C_AccountId__r.Owner.Email エラー ID: 928899535-267720 (1731341359)


1️⃣ The change is irreversible – Purge Protection cannot be disabled once activated.
2️⃣ Immediate permanent deletion is no longer possible, affecting test environments or automation scripts that rely on frequent key rotations.
3️⃣ Modifications to existing processes may be required to align with new deletion restrictions.

Potential Adjustments to DevOps & Automation – If existing workflows involve frequent deletion and recreation of Key Vaults, they may need modifications, as the same Key Vault name cannot be reused until the soft-delete retention period ends.

```
DBの手順について
・DTUと容量確認で、設定値が細かく異なるので、ここは違いをわかりやすく明示してほしい。

App serviceの手順について
・MOLITのテナントとMOLの二つのテナントを行き来することを注意書きしてほしい。
　（できたら二つともURLがあるといい）
・確認する値の種類が一つしか書かれていないのですべて書いてほしい。
・複数の値の種類を同時に確認できるようだが、同時に表示する方法について手順化してほしい。
・毎度注意書きが出てくるが、そのスクショと後続の対応手順を書いてほしい。

記録シートについて
・何月何日何時から何月何日何時までのデータを取ったのかを分かるようにしてほしい。
　→別の人が急に行ったときに確認する期間の幅の違いが生じてしまうため


その他全体的な指摘
・それぞれの手順を行う上での手順はできているが、推奨の手順の順番の流れを書いてほしい。
・各手順の最後に、別シートにあるグラフの更新を確認する旨記載してほしい。
・一番最初に、手順の背景、頻度などをを書いてほしい
```
