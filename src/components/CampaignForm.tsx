// src/components/CampaignForm.tsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface CampaignFormProps {
    initialValues: any;
    onSubmit: (values: any) => void;
    onClose: () => void;
    open: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ initialValues, onSubmit, onClose, open }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Создать/Редактировать Акцию</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Название обязательно'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div>
                                <label htmlFor="name">Название рассылки</label>
                                <Field name="name" type="text" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <DialogActions>
                                <Button onClick={onClose} color="primary">
                                    Отмена
                                </Button>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    Сохранить
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignForm;
