import { ErrorMessage, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { writeContent } from "../../../api";
import { LanguageDropdown } from "./LanguageDropdown";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Paste your text to transform it"),
  isoLang: Yup.string().required("Select a language"),
});

export const TextInputPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({
    text: source,
    isoLang,
  }: {
    text: string;
    isoLang: string;
  }) => {
    try {
      const { data } = await writeContent({
        isoLang,
        source,
      });
      navigate(`/output/${data}`);
    } catch (error: any) {
      const errors = error?.response?.data.errors ?? [];
      if (errors.length > 0) alert(errors[0].msg);
      else alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-2xl  shadow p-8 rounded-lg">
        <div className="w-full text-center space-y-3">
          <h2 className="text-lg leading-8 font-semibold">
            Upload Source Material
          </h2>
          <p className="text-md leading-6 font-normal text-gray-500">
            Source materials is content that you want to extract information
            from.
          </p>
        </div>
        <div className="mt-20">
          <Formik
            initialValues={{ text: "", isoLang: "en" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, setFieldValue }) => (
              <Form className="space-y-10">
                <LanguageDropdown
                  onLanguageChange={(lang) => setFieldValue("isoLang", lang)}
                />

                <div className="flex flex-col justify-start items-start w-full">
                  <div className="w-full border border-gray-600/20 rounded-lg">
                    <textarea
                      className="w-full py-1 outline-none px-3 bg-transparent text-sm h-64"
                      name="text"
                      placeholder="Paste transcripts, articles and other text here"
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    name="text"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  className="mt-5 w-full bg-[#FF5698] rounded-lg text-sm text-white font-semibold py-2 px-4 focus:outline-none focus:shadow-outline "
                  type="submit"
                >
                  Upload
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
