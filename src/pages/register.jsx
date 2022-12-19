import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../components/common/form";
import auth from "../services/authService";
import { withRouter } from "../hooks/withRouter";
import { BeatLoader } from "react-spinners";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(6).max(10).label("Password"),
    name: Joi.string().required().min(3).max(10).label("Name"),
  };

  doSubmit = async () => {
    try {
      this.setState({
        loading: true,
      });
      await auth.register(this.state.data);
      this.setState({
        loading: false,
      });
      window.location = "/";
      // this.props.router.navigate("/movies", { replace: true });
    } catch (e) {
      this.setState({
        loading: false,
      });
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data.error.message;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create new account
            </h1>
            <form
              onSubmit={this.handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/forgetPassword"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              {!loading ? (
                this.renderButton("Register")
              ) : (
                <BeatLoader loading={loading} color={"#123abc"} />
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do already have an account
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
