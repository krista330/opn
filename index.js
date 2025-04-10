    public void searchQuoteDetails() {
        String query = 'SELECT Name, Description__c, Quantity__c, Quote__r.Name FROM QuoteDetail__c WHERE Quote__r.Name LIKE :\'%' + searchAccountName + '%\' AND Opportunity__r.Name LIKE :\'%' + searchOpportunityName + '%\' AND OwnerId = :searchOwnerId';

        List<QuoteDetail__c> found = Database.query(query);

        // 検索結果が50件を超えた場合
        if (found.size() > 50) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '検索結果が50件を超えています。絞り込み条件を変更してください。'));
            searchResults = new List<WrapperQuoteDetail>();
            return;
        }

        searchResults = new List<WrapperQuoteDetail>();
        for (QuoteDetail__c qd : found) {
            searchResults.add(new WrapperQuoteDetail(qd));
        }
    }


1page
画面遷移なし、操作がシンプルで分かりやすい
小〜中規模データ向き
画面構成が複雑になる恐れあり（UI設計に工夫が必要）
2pages
処理の分離により保守性・拡張性が高い
検索・選択機能をリッチに設計可能
画面遷移あり、ユーザーにとってやや手間になる可能性

利点：
ページ遷移なし：画面遷移なしでデータ操作ができ、スムーズな体験が提供されます。
シンプルな画面維持：主画面はシンプルなままで、必要な操作をモーダルで行えます。
統一されたUI：同じページ内で操作が完結し、ユーザーに一貫した体験を提供します。

欠点：
状態同期が複雑：モーダル内の操作後、主画面のデータ更新や同期が難しい場合があります。
管理が煩雑：モーダルの開閉やデータ管理に追加のロジックが必要です。
モバイル対応の問題：モバイル端末では表示や操作が最適化されていない可能性があります。

```
<apex:page controller="QuoteCopyController" sidebar="false" showHeader="true">
    <apex:form id="mainForm">

        <!-- ✅ Toast メッセージ -->
        <div id="toast" style="display:none; position:fixed; top:10px; right:20px; background:#0070d2; color:white; padding:10px 20px; border-radius:5px; z-index:10000;">
            コピー成功！
        </div>

        <!-- ✅ 現在の見積明細リスト（編集可能） -->
        <h2>現在の見積明細</h2>
        <apex:outputPanel id="quoteDetailsBlock">
            <apex:pageBlock title="見積明細一覧">
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
        </apex:outputPanel>

        <!-- ✅ モーダルを開くボタン -->
        <apex:commandButton value="他の見積から明細をコピー" onclick="openModal(); return false;" styleClass="btn" />

        <!-- ✅ モーダル ウィンドウ -->
        <div id="copyModal" style="display:none; position:fixed; top:10%; left:10%; width:80%; height:75%; background:#fff; border:1px solid #ccc; box-shadow:0 0 15px #aaa; padding:20px; z-index:9999; overflow:auto;">
            <h3>他の見積から明細をコピー</h3>

            <label>見積番号:</label>
            <apex:inputText value="{!searchQuoteNumber}" />
            <apex:commandButton value="検索" action="{!searchQuoteDetails}" rerender="searchResults" styleClass="btn" />

            <apex:outputPanel id="searchResults">
                <apex:pageBlock title="検索結果">
                    <apex:pageBlockTable value="{!searchResults}" var="result">
                        <apex:column headerValue="選択">
                            <apex:inputCheckbox value="{!result.selected}" />
                        </apex:column>
                        <apex:column value="{!result.detail.Name}" headerValue="項目名" />
                        <apex:column value="{!result.detail.Description__c}" headerValue="説明" />
                        <apex:column value="{!result.detail.Quantity__c}" headerValue="数量" />
                    </apex:pageBlockTable>
                </apex:pageBlock>
            </apex:outputPanel>

            <br/>
            <apex:commandButton value="コピーする"
                                action="{!copySelectedDetails}"
                                rerender="quoteDetailsBlock"
                                oncomplete="afterCopyDone();" styleClass="btn" />
            <input type="button" value="閉じる" onclick="closeModal();" class="btn" />
        </div>

    </apex:form>

    <!-- ✅ JS: モーダル制御 + トースト -->
    <script>
        function openModal() {
            document.getElementById('copyModal').style.display = 'block';
        }
        function closeModal() {
            document.getElementById('copyModal').style.display = 'none';
        }
        function afterCopyDone() {
            closeModal();
            showToast('選択した見積明細がコピーされました。');
        }
        function showToast(msg) {
            let toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2000);
        }
    </script>

    <!-- ✅ シンプルなスタイル -->
    <style>
        .btn {
            background-color: #0070d2;
            color: white;
            border: none;
            padding: 6px 14px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn:hover {
            background-color: #005fb2;
        }
    </style>
</apex:page>

```


```
public class QuoteCopyController {

    public List<QuoteDetail__c> currentQuoteDetails { get; set; }
    public String searchQuoteNumber { get; set; }
    public List<WrapperQuoteDetail> searchResults { get; set; }

    public QuoteCopyController() {
        // 現在の見積IDを取得
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        currentQuoteDetails = [
            SELECT Name, Description__c, Quantity__c
            FROM QuoteDetail__c
            WHERE Quote__c = :quoteId
        ];
    }

    public void searchQuoteDetails() {
        List<QuoteDetail__c> found = [
            SELECT Name, Description__c, Quantity__c, Quote__r.Name
            FROM QuoteDetail__c
            WHERE Quote__r.Name LIKE :('%' + searchQuoteNumber + '%')
            LIMIT 50
        ];

        searchResults = new List<WrapperQuoteDetail>();
        for (QuoteDetail__c qd : found) {
            searchResults.add(new WrapperQuoteDetail(qd));
        }
    }

    public void copySelectedDetails() {
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        List<QuoteDetail__c> toInsert = new List<QuoteDetail__c>();

        for (WrapperQuoteDetail wrap : searchResults) {
            if (wrap.selected) {
                QuoteDetail__c copy = wrap.detail.clone(false, false, false, false);
                copy.Quote__c = quoteId;
                toInsert.add(copy);
            }
        }

        if (!toInsert.isEmpty()) {
            insert toInsert;
        }

        // コピー後、現在の見積明細を再取得して更新
        currentQuoteDetails = [
            SELECT Name, Description__c, Quantity__c
            FROM QuoteDetail__c
            WHERE Quote__c = :quoteId
        ];
    }

    public class WrapperQuoteDetail {
        public QuoteDetail__c detail { get; set; }
        public Boolean selected { get; set; }

        public WrapperQuoteDetail(QuoteDetail__c d) {
            this.detail = d;
            this.selected = false;
        }
    }
}
```

<apex:page controller="TableController">
    <apex:form>
        <apex:pageBlock title="データ一覧">
            <!-- スクロール可能なテーブルのラッパー -->
            <apex:outputPanel layout="block" style="max-height: 300px; overflow-y: auto; border: 1px solid #ccc; display: block;">
                <apex:pageBlockTable value="{!contacts}" var="con" styleClass="scrollableTable">
                    <apex:column headerValue="Id">
                        <apex:outputText value="{!con.Id}" />
                    </apex:column>
                    <apex:column>
                        <apex:facet name="header">
                            <span class="stickyHeader">名前</span>
                        </apex:facet>
                        <apex:outputText value="{!con.Name}" />
                    </apex:column>
                    <apex:column>
                        <apex:facet name="header">
                            <span class="stickyHeader">メール</span>
                        </apex:facet>
                        <apex:outputText value="{!con.Email}" />
                    </apex:column>
                </apex:pageBlockTable>
            </apex:outputPanel>
        </apex:pageBlock>
    </apex:form>

    <!-- ヘッダー固定用の CSS -->
    <style>
        .scrollableTable {
            width: 100%;
            border-collapse: collapse;
        }

        /* Stickyヘッダーの設定 */
        .stickyHeader {
            position: sticky;
            top: 0;
            background: #f8f8f8;
            z-index: 2;
            display: block;
            padding: 8px;
            font-weight: bold;
            border-bottom: 2px solid #ccc;
        }

        .scrollableTable td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
    </style>
</apex:page>


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
