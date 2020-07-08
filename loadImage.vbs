Sub LoadImage()
Dim HLK As Hyperlink, Rng As Range
For Each HLK In ActiveSheet.Hyperlinks  '循环活动工作表中的各个超链接
    If UCase(HLK.Address) Like "*.JPG" Or UCase(HLK.Address) Like "*.JPEG" Or UCase(HLK.Address) Like "*.PNG" Or UCase(HLK.Address) Like "*.GIF" Then  '如果链接的位置是jpg或gif图片(此处仅针对此两种图片类型,更多类型可以通过建立数组或字典或正则来判断)
        Set Rng = HLK.Parent.Offset(, 0)  '设定插入目标图片的位置
        With ActiveSheet.Pictures.Insert(HLK.Address)  '插入链接地址中的图片
            If .Height / .Width > Rng.Height / Rng.Width Then  '判断图片纵横比与单元格纵横比的比值以确定针对单元格缩放的比例
                .Top = Rng.Top
                .Left = Rng.Left + (Rng.Width - .Width * Rng.Height / .Height) / 2
                .Width = .Width * Rng.Height / .Height
                .Height = Rng.Height
            Else
                .Left = Rng.Left
                .Top = Rng.Top + (Rng.Height - .Height * Rng.Width / .Width) / 2
                .Height = .Height * Rng.Width / .Width
                .Width = Rng.Width
            End If
        End With
        HLK.Parent.Value = ""   '删除单元格的图片链接
    End If
Next
End Sub
