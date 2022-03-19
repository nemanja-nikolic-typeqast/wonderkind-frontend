export const fieldRules =
    {
        titleRules: [
            v => !!v || 'Title is required',
        ],
        descriptionRules: [
            v => !!v || 'Description is required',
        ],
        authorRules: [
            v => !!v || 'Author is required',
        ],
        amountRules: [
            v => !!v || 'Amount is required',
        ],
        firstNameRules: [
            v => !!v || 'First name is required',
        ],
        lastNameRules: [
            v => !!v || 'Last name is required',
        ],
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'E-mail not in valid format',
        ],
        quantityRules: [
            v => !!v || 'Quantity is required',
        ],

        max20Chars: [
            v => v.length <= 20 || 'Max 20 characters',
        ],
        max50Chars: [
            v => v.length <= 50 || 'Max 50 characters',
        ],
        max100Chars: [
            v => v.length <= 100 || 'Max 100 characters',
        ],
        max150Chars: [
            v => v.length <= 150 || 'Max 150 characters',
        ],
        max200Chars: [
            v => v.length <= 200 || 'Max 200 characters',
        ],
        max255Chars: [
            v => v.length <= 200 || 'Max 255 characters',
        ],
        max1000Chars: [
            v => v.length <= 1000 || 'Max 1000 characters',
        ],

        positiveValue: [
            v => (v >= 0) || 'Value must be positive',
        ],
    }
