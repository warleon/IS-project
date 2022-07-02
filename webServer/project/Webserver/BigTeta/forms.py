from django import forms

class DocumentForm(forms.Form):
    docfile = forms.FileField(
        label = 'Select a file',
        required = True,
        widget = forms.FileInput(
            attrs = {
                'class': 'w-100 form-control'
            })
    )

    title = forms.CharField(
        label = 'Title',
        min_length = 1,
        max_length = 100,
        required = True,
        strip = True,
        widget = forms.Textarea(
            attrs = {
                'placeholder': 'Insert video title here...',
                'class': 'w-100 form-control',
                'rows': '3',
                'style': 'resize: none'
            })
    )

    description = forms.CharField(
        label = 'Description',
        strip = True,
        widget = forms.Textarea(
            attrs = {
                'placeholder': 'Insert video description here...',
                'class': 'w-100 form-control form-control-sm',
                'rows': '5',
                'style': 'resize: none'
            })
    )
