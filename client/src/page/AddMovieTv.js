import React from 'react';
import Loading from '../shared/elements/Loading'
import { useHttp } from '../shared/hooks/httpHook'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

import './AddMovieTv.css'
import Button from '../shared/elements/Button';

const AddMovieTv = () => {
  const { isLoading, error, sendRequest } = useHttp()
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"]
  return (
    <div className="Add-movie-tv">
      <h2>Add Movie</h2>
      <Formik
        initialValues={{
          category: '',
          overview: '',
          release_date: '',
          title: '',
          cover: '',
          cast: [{ name: '', profile_path: '' }]
        }}
        validationSchema={Yup.object({
          category: Yup.string()
            .required('Please provide a category.'),
          overview: Yup.string()
            .required('Please provide a overview.'),
          release_date: Yup
            .date()
            .required('Please provde release date.')
            .max(new Date()),
          title: Yup.string().required('Title is required.'),
          cover: Yup
            .mixed()
            .required('Please provide cover image.')
            .test('type', 'Incorrect file format. Only JPG, PNG files', value => {
              if (!value?.type) return
              return SUPPORTED_FORMATS.includes(value.type)
            }),
          cast: Yup
            .array()
            .of(
              Yup.object().shape({
                name: Yup.string().required('Please provide a name'),
                profile_path: Yup.mixed().required('Please provide actors image').test('type', 'Incorrect file format. Only JPG, PNG files', value => {
                  if (!value?.type) return
                  return SUPPORTED_FORMATS.includes(value.type)
                })
              })
            )
        })}
        onSubmit={async (values) => {
          try {
            const formData = new FormData()
            formData.append('category', values.category)
            formData.append('cover', values.cover)
            formData.append('overview', values.overview)
            formData.append('release_date', values.release_date)
            formData.append('title', values.title)
            for(let i = 0; i < values.cast.length; i++){
              formData.append(`actor_name`, values.cast[i].name)
              formData.append(`actor_image`, values.cast[i].profile_path)
            }
            
            await sendRequest(`/api/v1/show/add`, 'POST', formData)
            } catch (error) { }
        }}
      >
        {props => (

          <Form>
            <div className="Form-group">
              <label htmlFor="category">Category</label>
              <Field name="category" as="select">
                <option value="">Choose Category</option>
                <option value="movie">Movie</option>
                <option value="tv">Tv</option>
              </Field>

              <ErrorMessage component="span" name="category" />
            </div>

            <div className="Form-group">
              <label htmlFor="overview">Overview</label>
              <Field name="overview" as="textarea" rows="6" cols="50" />
              <ErrorMessage component="span" name="overview" />
            </div>

            <div className="Form-group">
              <label htmlFor="cover">Cover</label>
              <Field
                name="cover"
                type="file"
                value={props.values.name}
                onChange={(event) => props.setFieldValue("cover", event.currentTarget.files[0])}
                accept=".jpg, .jpeg, .png" />
              <ErrorMessage component="span" name="cover" />
            </div>

            <div className="Form-group">
              <label htmlFor="release_date">Release date</label>
              <Field name="release_date" type="date" />
              <ErrorMessage component="span" name="release_date" />
            </div>

            <div className="Form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" />
              <ErrorMessage component="span" name="title" />
            </div>

            <div>
              <label htmlFor="cast"><h3>Cast</h3></label>
              <FieldArray name="cast">

                {({ push, remove }) => (
                  <>
                    {
                      props.values.cast.map((_, i) => {
                        return (
                          <React.Fragment key={i}>

                            <div className="Form-group" >
                              <label htmlFor="actorName">Actor Name</label>
                              <Field name={`cast[${i}].name`} type="text" />
                              <ErrorMessage component="span" name={`cast[${i}].name`} />
                            </div>
                            <div className="Form-group" >
                              <label htmlFor="actorImage">Actor Image</label>
                              <Field
                                type="file"
                                value={undefined}
                                name={`cast[${i}].profile_path`}
                                onChange={event => props.setFieldValue(`cast[${i}].profile_path`, event.currentTarget.files[0])}
                                accept=".jpg, .jpeg, .png" />
                              <ErrorMessage component="span" name={`cast[${i}].profile_path`} />
                            </div>

                            <button className="Form-action-btn" onClick={() => remove(i)}>Remove Actor
                              <svg width="25px" fill="#df3333" version="1.1" id="Layer_1" x="0px" y="0px"
                                viewBox="0 0 443 443">
                                <g>
                                  <path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z" />
                                  <path d="M295.142,214.31l5.66-86.31H62.769l19.016,290h114.172c-14.861-21.067-23.602-46.746-23.602-74.43
		C172.355,274.43,226.849,217.779,295.142,214.31z"/>
                                  <path d="M301.785,244.141c-54.826,0-99.43,44.604-99.43,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43
		S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963
		l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z"/>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                              </svg>
                            </button>
                            <hr />
                          </React.Fragment >
                        )
                      })
                    }
                    <br />
                    <button className="Form-action-btn" type="button" onClick={() => push({ name: '', profile_path: '' })}>Add to list
                      <svg fill="#42a728" width="25px" version="1.1" id="Capa_1" x="0px" y="0px"
                        viewBox="0 0 42 42">
                        <path d="M37.059,16H26V4.941C26,2.224,23.718,0,21,0s-5,2.224-5,4.941V16H4.941C2.224,16,0,18.282,0,21s2.224,5,4.941,5H16v11.059
	C16,39.776,18.282,42,21,42s5-2.224,5-4.941V26h11.059C39.776,26,42,23.718,42,21S39.776,16,37.059,16z"/>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                      </svg>

                    </button>
                  </>
                )}

              </FieldArray>
            </div>

            <Button className="Add-btn" type="submit" disabled={!(props.isValid && props.dirty)}>{isLoading ? <Loading size="10px"/> : 'Submit'}</Button>
                  {error && <p>{error.message}</p>}
          </Form>
        )}


      </Formik>
    </div>
  );
}

export default AddMovieTv;
