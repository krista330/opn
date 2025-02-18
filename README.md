```
@echo off
rem Salesforceのメタデータバックアップを取得します。

set curdir=%~dp0
cd /d %curdir%

rem 環境変数

rem メタデータの出力先
set backup.dir=.\05.daiichigolf

rem メタデータの指定。取得するメタデータや除外するメタデータを指定します。
rem 指定がない場合全てのメタデータが対象となります。両方同時に指定できません。
rem メタデータはカンマ区切りで複数指定可能です。メタデータは次のような指定となります。
rem AuraDefinitionBundle, AnalyticSnapshot, ApexClass, ApexComponent, ApexPage, ApexTrigger, ApprovalProcess, AssignmentRules, AuthProvider, AutoResponseRules, CallCenter, Community, ConnectedApp, CustomApplication, CustomLabels, CustomObject, CustomObjectTranslation, CustomPageWebLink, CustomSite, CustomTab, Dashboard, DataCategoryGroup, Document, EmailTemplate, EscalationRules, FlexiPage, Flow, Group, HomePageComponent, HomePageLayout, InstalledPackage, Layout, Letterhead, PermissionSet, PostTemplate, Profile, Queue, QuickAction, RemoteSiteSetting, Report, ReportType, Role, Scontrol, Settings, StaticResource, Workflow
set metadata.include=
set metadata.exclude=

rem salesforce ログイン情報 / https://login.salesforce.com/services/Soap/u/51.0 or https://test.salesforce.com/services/Soap/u/51.0
set sfdc.url=https://test.salesforce.com/services/Soap/u/51.0
set sfdc.username=endo.h.tsukada@nddhq.co.jp.daichigolf
set sfdc.password=4r393Q6JzMTknsY

rem プロキシ情報（プロキシを指定しない場合は、空をセット）
set http.proxyHost=
set http.proxyPort=
set http.proxyUser=
set http.proxyPassword=
set http.auth.ntlm.domain=

rem java.exeにパスが通っている前提、適宜javaコマンドへのフルパスに変更してください。(jre8がインストールされていればパスは通ってます)
set JAVACMD=java
%JAVACMD% -Djdk.http.auth.tunneling.disabledSchemes=  -Xms32m -Xmx1024m -cp "%curdir%\bin\*" ExportMetadata

pause
rem exit %ERRORLEVEL%
```
