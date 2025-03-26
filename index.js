```
az keyvault show --name <KeyVault名> --resource-group <リソースグループ名> --query properties.softDeleteRetentionInDays
```

```
// 既存の FeedItem の ID（変更したいもの）
Id oldFeedItemId = '0D5XXXXXXXXXXXXXXX';

// 新しい ParentId（変更先のレコード ID）
Id newParentId = '005XXXXXXXXXXXXXXX'; // ユーザー, グループ, レコード ID など

// 1. 既存の FeedItem を取得
FeedItem oldFeed = [SELECT Body, LinkUrl, Title, Visibility FROM FeedItem WHERE Id = :oldFeedItemId];

// 2. 新しい FeedItem を作成
FeedItem newFeed = new FeedItem();
newFeed.ParentId = newParentId;
newFeed.Body = oldFeed.Body;
newFeed.LinkUrl = oldFeed.LinkUrl; // LinkPost の URL
newFeed.Title = oldFeed.Title;
newFeed.Type = 'LinkPost';
newFeed.Visibility = oldFeed.Visibility; // Chatter の可視性設定

insert newFeed;

// 3. 古い FeedItem を削除（不要なら省略）
delete oldFeed;

System.debug('新しい FeedItem が作成されました: ' + newFeed.Id);

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
