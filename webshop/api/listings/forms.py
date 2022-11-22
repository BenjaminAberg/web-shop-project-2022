from django import forms


class CreateListingForm(forms.Form):
    title = forms.CharField(max_length=50)
    description = forms.CharField(max_length=200)
    price = forms.FloatField(min_value=0.1, required=True)
