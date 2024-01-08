import * as yup from 'yup'

const phoneRegExp =
    /^((\\[+][1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const numberRegExp = /^[0-9]+$/
const urlRegExp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
const passRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]))[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,16}$/

export const UserSchema = yup.object({
    name: yup
        .string()
        .min(4, 'name must have alteast 4 characters')
        .required('Name is required.'),
    username: yup.string().required('Username is required.'),
    email: yup
        .string()
        .nullable()
        .email('Not a valid email')
        .required('Email is required.'),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            passRegExp,
            'Password should be 8-16 characters, Must contain at least one uppercase and lowercase letter and one number or one special character.'
        ),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf(
            [yup.ref('password')],
            'Password and confirm password does not match'
        ),
})

export const EditAddress = yup.object({
    fullName: yup
        .string()
        .min(4, 'Name must have alteast 4 characters')
        .required('Name is required.'),
    companyName: yup.string(),
    country: yup.string(),
    state: yup.string().required('State is required.'),
    address: yup.string(),
    city: yup.string(),
    zipCode: yup.string(),
})

export const ServiceSchema = yup.object({
    name: yup.string().required('Service name is required.'),
    title: yup.string().required('Service title is required.'),
    description: yup.string().required('Service description is required.'),
    technologies: yup
        .array()
        .of(
            yup.object({
                label: yup.string().required('Required'),
                value: yup.string().required('Required'),
            })
        )
        .required('Service technologies is required, (Atleast one.)'),
    thumbnail:
        yup.string().required('thumbnail is required') ||
        yup.object().required('thumbnail is required'),
    // yup.mixed()
    //   .test('isStringOrFile', "thumbnail is required", (value) => {
    //     return typeof value === 'string' || (value instanceof File && value.type.startsWith('image/'));
    //   }),
    priceList: yup
        .array()
        .of(
            yup.object({
                type: yup.string().required('Required'),
                name: yup.string().required('Required'),
                price: yup
                    .string()
                    .required('Required')
                    .matches(numberRegExp, 'Price is not valid'),
                about: yup.string().required('Required'),
                revisions: yup
                    .string()
                    .required('Required')
                    .matches(numberRegExp, 'Revisions number is not valid'),
                delivery: yup
                    .string()
                    .required('Required')
                    .matches(numberRegExp, 'Days number is not valid'),
            })
        )
        .required('Field is required'),
})

export const ProjectSchema = yup.object({
    title: yup.string().required('Project name is required.'),
    description: yup.string().required('Project description is required.'),
    technologies: yup
        .array()
        .of(
            yup.object({
                label: yup.string(),
                value: yup.string(),
            })
        )
        .required('Project technologies is required, (Atleast one.)'),
    categories: yup
        .array()
        .of(
            yup.object({
                label: yup.string(),
                value: yup.string(),
            })
        )
        .required('Project technologies is required, (Atleast one.)'),
    thumbnail: yup
        .mixed()
        .test('isStringOrFile', 'thumbnail is required', (value) => {
            return (
                typeof value === 'string' ||
                (value instanceof File && value.type.startsWith('image/'))
            )
        }),
    github: yup.string().url().label('Path'),
    link: yup.string().url().label('Path'),
})

export const SkillSchema = yup.object({
    position: yup.string().required('Position is required.'),
    company: yup.string().required('Company is required.'),
    companyLink: yup
        .string()
        .required('Company link is required.')
        .matches(urlRegExp, 'Url is not valid'),
    technologies: yup
        .array()
        .of(
            yup.object({
                label: yup.string(),
                value: yup.string(),
            })
        )
        .required('Project technologies is required, (Atleast one.)'),
    startDate: yup.date().required('Job start date is required.'),
    workingNow: yup
        .boolean()
        .default(false)
        .required('Working presently? YES/NO'),
    endDate: yup
        .date()
        .when('workingNow', {
            is: true,
            then: (schema) => schema.nullable(),
        })
        .required('Please enter end date.'),
    description: yup.string().required('Skill description is required.'),
    image: yup
        .mixed()
        .test('required', 'Please select a image.', (value: any) => {
            return value
        }),
})

export const TestimonialSchema = yup.object({
    name: yup.string().required('Name is required.'),
    comment: yup.string().required('Comment is required.'),
    rating: yup
        .string()
        .matches(numberRegExp, 'Number is not valid')
        .required('Rating is required.'),
    avatar: yup
        .mixed()
        .test('required', 'Please select a review image.', (value: any) => {
            return value
        }),
})

export const ContactUs = yup.object({
    firstName: yup.string().required('Your first name is required*'),
    lastName: yup.string(),
    email: yup
        .string()
        .email('Not a valid email')
        .required('Your email is required*'),
    phoneNumber: yup.string().required('Your Phone Number is required*'),
    help: yup.string(),
    serviceIntrest: yup
        .array()
        .of(
            yup.object({
                id: yup.string(),
                value: yup.string(),
            })
        )
        .required('required, (Atleast one.)*'),
    message: yup.string().required('Please write your query. Required*'),
})
