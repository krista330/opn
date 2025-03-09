# CSVファイルのパスを指定
$csvPath = "C:\Users\whz_z\Desktop\test\field-definitions.csv"

# 保存先のパスを指定
$outputPath = "C:\Users\whz_z\Desktop\test"

# namespace URI
$namespaceUri = "http://soap.sforce.com/2006/04/metadata"

# CSVファイルが存在するか確認
if (Test-Path $csvPath) {
    # CSVファイルを読み込み
    $csvData = Import-Csv -Path $csvPath
    
    # CSVヘッダーを取得
    $headers = $csvData[0].PSObject.Properties.Name
    
    # 各行に対してXMLファイルを生成
    foreach ($row in $csvData) {
        # XMLドキュメントを作成
        $settings = New-Object System.Xml.XmlWriterSettings
        $settings.Indent = $true
        $settings.OmitXmlDeclaration = $false
        $settings.Encoding = [System.Text.Encoding]::UTF8
        
        # ファイル名はfullName属性を使用
        $fileName = Join-Path -Path $outputPath -ChildPath "$($row.fullName).field-meta.xml"
        $writer = [System.Xml.XmlWriter]::Create($fileName, $settings)
        
        # XML宣言を追加
        $writer.WriteStartDocument()
        
        # CustomField要素を作成（namespaceを指定）
        $writer.WriteStartElement("CustomField", $namespaceUri)
        
        # 各ヘッダーに対応する子要素を動的に作成
        foreach ($header in $headers) {
            $value = $row.$header
            
            # required と trackFeedHistory の場合は真偽値に変換してLowerCaseに
            if ($header -eq "required" -or $header -eq "trackFeedHistory") {
                $boolValue = if ($value -eq "true") { $true } else { $false }
                $value = $boolValue.ToString().ToLower()
            }
            
            # 子要素を作成（namespace無し）
            $writer.WriteElementString($header, $value)
        }
        
        # CustomField要素を閉じる
        $writer.WriteEndElement()
        
        # ドキュメントを閉じて保存
        $writer.WriteEndDocument()
        $writer.Flush()
        $writer.Close()
        
        Write-Host "Generated XML file: $fileName"
    }
    
    Write-Host "XML generation completed successfully."
} else {
    Write-Error "CSV file not found at path: $csvPath"
}
