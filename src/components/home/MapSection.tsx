import SectionHeading from "../SectionHeading";

const MapSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-regent">
        <SectionHeading subtitle="Find Us" title="PROJECT LOCATIONS" description="Our developments are strategically located across prime areas of Dhaka." />
      </div>
      <div className="w-full h-[500px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58404.80574405488!2d90.37!3d23.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x3f1e4bbfc8b7b90a!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Regent Project Locations"
        />
        <div className="absolute inset-0 pointer-events-none border-t border-b border-border" />
      </div>
    </section>
  );
};

export default MapSection;
