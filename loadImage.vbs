Sub LoadImage()
Dim HLK As Hyperlink, Rng As Range
For Each HLK In ActiveSheet.Hyperlinks  'ѭ����������еĸ���������
    If UCase(HLK.Address) Like "*.JPG" Or UCase(HLK.Address) Like "*.JPEG" Or UCase(HLK.Address) Like "*.PNG" Or UCase(HLK.Address) Like "*.GIF" Then  '������ӵ�λ����jpg��gifͼƬ(�˴�����Դ�����ͼƬ����,�������Ϳ���ͨ������������ֵ���������ж�)
        Set Rng = HLK.Parent.Offset(, 0)  '�趨����Ŀ��ͼƬ��λ��
        With ActiveSheet.Pictures.Insert(HLK.Address)  '�������ӵ�ַ�е�ͼƬ
            If .Height / .Width > Rng.Height / Rng.Width Then  '�ж�ͼƬ�ݺ���뵥Ԫ���ݺ�ȵı�ֵ��ȷ����Ե�Ԫ�����ŵı���
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
        HLK.Parent.Value = ""   'ɾ����Ԫ���ͼƬ����
    End If
Next
End Sub
