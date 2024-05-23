import React from "react";
import VideoPlayer from "../../components/pages/courses/VideoPlayer";
import CourseDetails from "../../components/pages/courses/CourseDetails";
import EnrollmentCourse from "../../components/pages/courses/EnrollmentCourse";

const CoursePreviewPage = () => {
  return (
    <div className="py-5 px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
        <div className="col-span-2">
          <VideoPlayer videoUrl="http://tayseerarar.com/wp-content/uploads/2020/02/Tometo-paste-web.mp4?_=1" />
          <CourseDetails />
        </div>
        <div>
          <EnrollmentCourse />
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
