from django import forms

class DocumentForm(forms.Form):
    docfile = forms.FileField(
        label = 'Select a file',
    )

    title = forms.CharField(
        label = 'Title',
        min_length = 1,
        max_length = 100,
        strip = True
    )
