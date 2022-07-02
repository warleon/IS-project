from django import forms

class DocumentForm(forms.Form):
    docfile = forms.FileField(
        label = 'Select a file',
        required = True,
    )

    title = forms.CharField(
        label = 'Title',
        min_length = 1,
        max_length = 100,
        required = True,
        strip = True
    )

    description = forms.CharField(
        label = 'Description',
        strip = True,
        widget = forms.Textarea(
            attrs = {
                'class': 'w-100'
            })
    )
